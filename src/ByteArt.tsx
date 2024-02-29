import React, { useState } from "react";

export type ByteArtProps = {
  rowCount?: number;
  colCount?: number;
  cellSize?: number;
  border?: string;
  hexString?: string;
};

export type ByteArtCellProps = {
  value?: number;
  width?: number;
  height?: number;
  border?: string;
}

const ByteArtCell: React.FC<ByteArtCellProps> = ({
  value,
  width,
  height,
  border = "1px solid #888",
}) => {
  // Use useState to manage the color value of the cell
  const [colorValue, setColorValue] = useState(value);

  // Function to generate a random color value
  const generateRandomColorValue = () => Math.floor(Math.random() * 16777215);

  // Update the color value to a new random value when the cell is clicked
  const handleClick = () => {
    const newValue = generateRandomColorValue();
    setColorValue(newValue);
  };

  // Convert the current color value to a color code for background
  const color = colorValue ? `#${colorValue.toString(16).padStart(6, '0')}` : '#000000';

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: color, // Use the generated color as the background
        border: border,
        display: 'inline-block',
        color: 'transparent', // Set text color to transparent
        borderRadius: '2px',
        cursor: 'pointer' // Change cursor to pointer to indicate clickable
      }}
      onClick={handleClick} // Attach the onClick event handler
    />
  );
};

const ByteArt: React.FC<ByteArtProps> = ({
  rowCount = 16,
  colCount = 16,
  cellSize = 12,
  hexString = "0x123456789ABCDEF123456789ABCDEF12"
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

  let binArray = hexStringToBinArray(hexString);

  console.log(binArray);

  const generateGrid = () => {
    let grid = [];
    for (let row = 0; row < rowCount; row++) {
      for (let col = 0; col < colCount; col++) {
        let cellValue = (row * colCount + col) % 16777215; // Ensure the value is within the RGB range
        grid.push(<ByteArtCell key={`${row}-${col}`} value={cellValue} width={cellSize} height={cellSize} />);
      }
    }
    return grid;
  };

  return <div style={{ display: 'flex', flexWrap: 'wrap', width: `${colCount * cellSize}px` }}>{generateGrid()}</div>;
};

export default ByteArt;