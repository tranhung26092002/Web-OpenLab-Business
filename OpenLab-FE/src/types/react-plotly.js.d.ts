declare module 'react-plotly.js' {
    import { ComponentType } from 'react';
    import Plotly from 'plotly.js-dist';
  
    interface PlotProps {
      data?: any;
      layout?: any;
      config?: any;
      useResizeHandler?: boolean;
      style?: React.CSSProperties;
      onInitialized?: (figure: Plotly.PlotlyHTMLElement) => void;
      onUpdate?: (figure: Plotly.PlotlyHTMLElement) => void;
    }
  
    const Plot: ComponentType<PlotProps>;
  
    export default Plot;
  }
  