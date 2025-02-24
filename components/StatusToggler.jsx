import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import CircleSpinner from "./loaders/CircleSpinner";

const StatusToggler = ({ initialChecked = false }) => {
  const [checked, setChecked] = useState(initialChecked);

  return (
    <div>
      {false ? (
        <CircleSpinner />
      ) : (
        <Switch
          checked={checked}
          onCheckedChange={setChecked} // Update state when the Switch is toggled
        />
      )}
    </div>
  );
};

export default StatusToggler;
