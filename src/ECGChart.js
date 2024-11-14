import React, { useRef, useState, useEffect, useImperativeHandle, forwardRef, useId } from 'react';
import {
    SciChart3DSurface,
    SciChartPieSurface,
    SciChartSurface,
    chartBuilder,
    generateGuid,
} from 'scichart';

const useIsMountedRef = () => {
    const isMountedRef = useRef(false);

    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    return isMountedRef;
};

class SciChartComponentAPI {
    constructor(initResultRef) {
        this.initResultRef = initResultRef;
    }

    get sciChartSurface() {
        return this.initResultRef.current.sciChartSurface;
    }

    get customChartProperties() {
        return this.initResultRef.current;
    }
}

const createChartRoot = () => {
    // check if SSR
    if (typeof window === 'undefined') {
        return null;
    }

    const internalRootElement = document.createElement('div');
    // generate or provide a unique root element id to avoid chart rendering collisions
    internalRootElement.id = `chart-root-${generateGuid()}`;
    return internalRootElement;
};

function createChartFromConfig(config) {
    return async (chartRoot) => {
        const chart = await chartBuilder.buildChart(chartRoot, config);
        if ('sciChartSurface' in chart) {
            // 2D Chart
            return { sciChartSurface: chart.sciChartSurface };
        } else {
            // Pie Chart
            return { sciChartSurface: chart };
        }
    };
}

const ECGChart = forwardRef((props, ref) => {
    const { initChart, config, apiProvider, fallback, ...divElementProps } = props;
    const componentId = useId(); // Move useId to top level

    if ((!initChart && !config) || (initChart && config)) {
        throw new Error(`Only one of "initChart" or "config" props is required!`);
    }

    const [divElementId] = useState(divElementProps.id ?? `component-root-${componentId}`);
    const isMountedRef = useIsMountedRef();
    const initPromiseRef = useRef();
    const initResultRef = useRef();
    const sciChartSurfaceRef = useRef();
    const [isInitialized, setIsInitialized] = useState(false);
    const [chartRoot] = useState(createChartRoot);

    useEffect(() => {
        const initializationFunction = initChart 
            ? initChart 
            : createChartFromConfig(config);

        const runInit = async () => {
            return initializationFunction(chartRoot).then((initResult) => {
                if (!initResult.sciChartSurface) {
                    throw new Error(
                        `"initChart" function should resolve to an object with "sciChartSurface" property ({ sciChartSurface })`
                    );
                }
                sciChartSurfaceRef.current = initResult.sciChartSurface;
                initResultRef.current = initResult;

                setIsInitialized(true);

                return initResult;
            });
        };

        // workaround to handle StrictMode
        const initPromise = initPromiseRef.current ? initPromiseRef.current.then(runInit) : runInit();
        initPromiseRef.current = initPromise;

        const performCleanup = () => {
            sciChartSurfaceRef.current.delete();
            sciChartSurfaceRef.current = undefined;
            initResultRef.current = undefined;
        };

        return () => {
            // check if chart is already initialized or wait init to finish before deleting it
            sciChartSurfaceRef.current ? performCleanup() : initPromise.then(performCleanup);
        };
    }, []);

    useEffect(() => {
        if (isInitialized && isMountedRef.current) {
            const rootElement = document.getElementById(divElementId);
            rootElement.appendChild(chartRoot);
        }
    }, [isInitialized]);

    // Expose Chart API
    useImperativeHandle(
        ref,
        () => (apiProvider ? apiProvider(initResultRef) : new SciChartComponentAPI(initResultRef)),
        [apiProvider]
    );

    return isInitialized ? <div {...divElementProps} id={divElementId} /> : fallback;
});

export default ECGChart;