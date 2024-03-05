import React, { useState, useEffect } from "react";

export type ByteArtProps = {
  rowCount?: number;
  colCount?: number;
  cellSize?: number;
  hexString?: string;
  borderRadius?: number;
  setHexString?: (hexString: string) => void;
};

export type ByteArtCellProps = {
  value?: number;
  setValue?: (count: number, value: number) => void,
  count?: number;
  width?: number;
  height?: number;
  borderRadius?: number;
  onColor?: string;
  offColor?: string;
}

const ByteArtCell: React.FC<ByteArtCellProps> = ({
  value,
  setValue = null,
  count = 0,
  width,
  height,
  borderRadius,
  onColor = "#CA2020",
  offColor = "#444",
}) => {
  const [colorValue, setColorValue] = useState(value === 1 ? onColor : offColor);

  // Update colorValue based on the value prop
  useEffect(() => {
    setColorValue(value === 1 ? onColor : offColor);
  }, [value, onColor, offColor]);

  const handleClick = () => {
    if (setValue) {
      setValue(count, value === 1 ? 0 : 1);
    }
  };

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: colorValue,
        display: 'inline-block',
        borderRadius: `${borderRadius}px`,
        cursor: 'pointer'
      }}
      onClick={handleClick}
    />
  );
};

const ByteArt: React.FC<ByteArtProps> = ({
  rowCount = 16,
  colCount = 16,
  cellSize = 12,
  borderRadius = 10,
  hexString = "0xdea102f6f2ac65501b2610c36a37e873ada2bdbedcd40f78ca10955455ff9274",
  setHexString = null,
}) => {

  const hexStringToBinArray = (hexString: string): number[] => {
    // Remove the '0x' prefix if present
    if (hexString.startsWith('0x')) {
      hexString = hexString.substring(2);
    }

    // Convert each hex digit to a 4-bit binary string
    const binArray = hexString.split('').map(hexDigit => {
      return parseInt(hexDigit, 16).toString(2).padStart(4, '0').split("");
    });

    const flatBinArray = binArray.flatMap(v => v.flatMap(e => parseInt(e)))

    return flatBinArray;
  }

  const binArrayToHexString = (binArray: number[]): string => {
    // Explicitly type the accumulator as string[]
    const binGroups = binArray.reduce<string[]>((acc, bit, index) => {
      const groupIndex = Math.floor(index / 4);
      if (!acc[groupIndex]) {
        acc[groupIndex] = ''; // Initialize a new group if it doesn't exist
      }
      acc[groupIndex] += bit.toString(); // Append the current bit to the current group
      return acc;
    }, []); // Initialize the accumulator as an empty array of strings

    // Convert each binary string group to its hexadecimal representation
    const hexString = binGroups.map(binaryGroup => {
      return parseInt(binaryGroup, 2).toString(16);
    }).join('');

    return `0x${hexString.padStart(Math.ceil(hexString.length / 2) * 2, '0')}`; // Ensure even length for hex string
  };

  const setOneCell = (count: number, newValue: number) => {
    setCells(cells => cells.map((cell, index) => index === count ? newValue : cell));

    if (setHexString) {
      setHexString(binArrayToHexString(cells));
    }
  };

  const initialCells = hexStringToBinArray(hexString);

  const [cells, setCells] = useState<number[]>(initialCells);

  useEffect(() => {
    let binArray = hexStringToBinArray(hexString);
    setCells(binArray);
  }, []);

  const generateGrid = () => {
    let grid = [];
    let count = 0;
    for (let row = 0; row < rowCount; row++) {
      for (let col = 0; col < colCount; col++) {
        grid.push(
          <ByteArtCell
            key={`${row}-${col}`}
            count={count}
            value={cells[count]}
            width={cellSize}
            height={cellSize}
            borderRadius={borderRadius}
            setValue={setOneCell}
          />
        );
        count++;
      }
    }
    return grid;
  };

  const size = colCount * (cellSize);
  return <div style={{ display: 'flex', flexWrap: 'wrap', width: `${size}px`, height: `${size}px` }}>{generateGrid()}</div>;
};

export default ByteArt;