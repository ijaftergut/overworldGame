import React, { useState, useEffect } from 'react';

const GameWorld = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const walls = [
    { x: 100, y: 100 },
    { x: 200, y: 200 },
    // Add more wall positions as needed
  ];
  
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Define the movement step size
      const step = 20;
      let newPosition = { ...playerPosition };
  
      switch (e.key) {
        case 'ArrowUp':
          newPosition.y += step;
          break;
        case 'ArrowDown':
          newPosition.y -= step;
          break;
        case 'ArrowLeft':
          newPosition.x -= step;
          break;
        case 'ArrowRight':
          newPosition.x += step;
          break;
        default:
          break;
      }
  
      // Check for collisions with walls
      for (const wall of walls) {
        if (
          newPosition.x < wall.x + 40 && // 40 is the width of the wall
          newPosition.x + 40 > wall.x &&  // 40 is the width of the player character
          newPosition.y < wall.y + 40 && // 40 is the height of the wall
          newPosition.y + 40 > wall.y    // 40 is the height of the player character
        ) {
          // If a collision is detected, do not update the player's position
          return;
        }
    }
      setPlayerPosition(newPosition);
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [playerPosition, walls]);

  return (
    <div className="game-world">
      <div
        className="player-character"
        style={{ left: playerPosition.x, bottom: playerPosition.y }}
      ></div>
      <div className="wall" style={{ left: 100, bottom: 100 }}></div>
      <div className="wall" style={{ left: 200, bottom: 200 }}></div>
      {/* Add more walls as needed */}
    </div>
  );
};

export default GameWorld;
