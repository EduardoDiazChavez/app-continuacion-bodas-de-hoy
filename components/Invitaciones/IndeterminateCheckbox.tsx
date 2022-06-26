import { ForwardRefComponent } from "framer-motion";
import { useEffect, forwardRef, useRef, useState } from "react";

// Para checkbox
export const IndeterminateCheckbox: ForwardRefComponent<HTMLInputElement, any> =
  forwardRef(({ indeterminate, checked, propParent, ...rest }, ref) => {
    const [ischecked, setChecked] = useState<boolean>(false);

    //@ts-ignore
    const ref1: any = ref;
    const ref2 = useRef<any>();

    const defaultRef = ref1 || ref2;

    useEffect(() => {
      if (checked !== ischecked) {
        setChecked(checked);
      } else {
        if (defaultRef?.current?.checked) {
          defaultRef.current.checked = ischecked;
        }
      }
    }, [checked, ischecked, defaultRef]);

    useEffect(() => {
      console.log("????? Se usa")
      if (defaultRef?.current?.indeterminate) {
        defaultRef.current.indeterminate = indeterminate;
      }
    }, [defaultRef, indeterminate]);

    const handleCheck = (e: any) => {
      setChecked(e.target.checked);
      propParent?.row?.toggleRowSelected(!ischecked);
    };

    IndeterminateCheckbox.displayName = "IndeterminateCheckbox";

    return (
      <label className="relative">
        <input
          onClick={handleCheck}
          type="checkbox"
          className="rounded-full text-primary focus:ring-primary border-gray-400"
          ref={defaultRef}
          checked={ischecked}
          {...rest}
        />
      </label>
    );
  });