import React from "react";

interface ContactInfoItemProps {
  value: string;
  icon: string;
}

export default function ContactInfoItem({ value, icon }: ContactInfoItemProps) {
  return (
    <>
      {value.length !== 0 && (
        <div className="item">
          <span className="material-symbols-outlined">{icon}</span>
          <div>{value}</div>
        </div>
      )}
    </>
  );
}
