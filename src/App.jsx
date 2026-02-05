import PricingCalculator from '@/pages/pricing-calculator/pricing-calculator';
import { useState } from 'react';

const App = () => {
  const [download, setDownload] = useState(false);

  return (
    <PricingCalculator
      download={download}
      setDownload={setDownload}
    />
  );
};

export default App;
