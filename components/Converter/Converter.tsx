import { useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './Converter.module.scss';
import convertUnits from '@/utils/math/Converter/units';

type ConversionType = 'length' | 'weight' | 'temperature' | 'time' | 'currency';

interface ConversionFormProps {
  conversionType: ConversionType;
  units: string[];
}

const ConversionForm: React.FC<ConversionFormProps> = ({ conversionType, units }) => {
  const [value, setValue] = useState<number | string>('');
  const [fromUnit, setFromUnit] = useState<string>(units[0]);
  const [toUnit, setToUnit] = useState<string>(units[1]);
  const [result, setResult] = useState<number | string>('');

  useEffect(() => {
    // Reset units when conversion type changes
    setFromUnit(units[0]);
    setToUnit(units[1]);
  }, [conversionType, units]);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setValue(value); 
    try {
      const convertedValue = convertUnits(value, fromUnit, toUnit, conversionType);
      setResult(convertedValue);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error('Unknown error', error);
      }
      setResult('');
    }
  };

  const handleFromUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFromUnit(e.target.value);
  };

  const handleToUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToUnit(e.target.value);
  };

  return (
    <form className={styles.form}>
      <label className={styles.label}>
        <input
          type="number"
          value={value}
          onChange={handleValueChange}
          className={styles.input}
        />
        <select value={fromUnit} onChange={handleFromUnitChange} className={styles.select}>
          {units.map(unit => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      </label>
      <div className={styles.equals}>=</div>
      <label className={styles.label}>
        <div className={styles.input}>{result}</div>
        <select value={toUnit} onChange={handleToUnitChange} className={styles.select}>
          {units.map(unit => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      </label>
    </form>
  );
};

export default ConversionForm;
