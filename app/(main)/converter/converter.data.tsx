import { ReactNode } from 'react';
import { Ruler, TemperatureLow, Timer, Weight, Coins } from "iconoir-react";

export interface ConverterItem {
  title: string;
  icon: ReactNode;
  link: string;
  type: 'distance' | 'weight' | 'temperature' | 'time' | 'currency';
}

export const converter: ConverterItem[] = [
  { title: 'Distance', icon: <Ruler />, link: '#', type: 'distance' },
  { title: 'Weight', icon: <Weight />, link: '#', type: 'weight' },
  { title: 'Temperature', icon: <TemperatureLow />, link: '#', type: 'temperature' },
  { title: 'Time', icon: <Timer />, link: '#', type: 'time' },
  { title: 'Currency', icon: <Coins />, link: '#', type: 'currency' },
];
