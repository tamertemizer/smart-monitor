import React from 'react';
import { 
    Box, 
    Typography
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { keyframes } from '@mui/system';

// Define the blinking animation
const criticalGlow = keyframes`
  0%, 100% { box-shadow: 0 0 30px rgba(239, 68, 68, 0.7); }
  50% { box-shadow: 0 0 5px rgba(239, 68, 68, 0.3); }
`;

const VitalDisplay = ({ 
  label, 
  value, 
  unit, 
  secondaryValue, 
  secondaryLabel, 
  color, 
  icon: Icon, 
  showTrend,
  showTrendDown,
  alert,
  state 
}) => {
  // Define the style based on state
  const getStateStyles = () => {
    switch(state) {
      case 'warning':
        return {
          boxShadow: '0 0 15px rgba(255, 152, 0, 0.5)',
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          '@keyframes pulse': {
            '0%, 100%': {
              boxShadow: '0 0 25px rgba(255, 152, 0, 0.5)',
            },
            '50%': {
              boxShadow: '0 0 10px rgba(255, 152, 0, 0.3)',
            },
          },
        };
      case 'critical':
        return {
          animation: `${criticalGlow} 1s ease-in-out infinite`,
        };
      default:
        return {};
    }
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        height: {xs:'140px', md:'110px', lg:'150px', xl:'150px'},
        width: {xs:'160px', md:'160px', lg:'175px', xl:'210px'},
        justifyContent: 'center',
        display: 'flex',
        position: 'relative',
        padding: '10px',
        ...getStateStyles(),
      }}
    >
      <Box sx={{
        justifySelf: 'center',
        alignSelf: 'center',
        flexDirection: 'column',
        display: 'flex',
        width: '100%'
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              color: color,
              textAlign: 'left',
              fontWeight: 'bold',
              fontSize: {xs:'16px', md:'20px', lg:'20px', xl:'22px'},
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            {Icon && <Icon size={20} />}
            {label}
          </Typography>
          {alert && <AlertCircle color="error" size={20} />}
        </Box>
        <Typography 
          variant="h2" 
          sx={{ 
            color: color,
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: {xs:'28px', md:'32px', lg:'36px', xl:'40px' },
          }}
        >
          {value}
          <Typography component="span" sx={{ fontSize: '16px', ml: 1 }}>{unit}</Typography>
        </Typography>
        {secondaryValue && (
          <Typography 
            sx={{ 
              color: color,
              textAlign: 'center',
              fontSize: {xs:'14px', md:'16px', lg:'16px'},
              opacity: 0.8
            }}
          >
            {secondaryLabel && secondaryLabel + ": "}{secondaryValue}
          </Typography>
        )}
        {showTrend && (
          <Box sx={{ position: 'absolute', right: 8, bottom: 8 }}>
            <TrendingUp color={color} size={20} />
          </Box>
        )}
        {showTrendDown && (
          <Box sx={{ position: 'absolute', right: 8, bottom: 8 }}>
            <TrendingDown color={color} size={20} />
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default VitalDisplay;