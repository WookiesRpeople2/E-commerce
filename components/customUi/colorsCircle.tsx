"use client";

import Color from "color";

type ColorsCircleProps = {
  color: string;
};

export const ColorsCircle: React.FC<ColorsCircleProps> = ({ color }) => {
  return (
    <div className="space-x-1">
      <div
        style={{
          backgroundColor: Color(color.toLowerCase()).rgb().toString(),
        }}
        className="h-4 w-4 rounded-full"
      ></div>
    </div>
  );
};
