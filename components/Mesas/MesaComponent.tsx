import React, {
  cloneElement,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useDrag, useDrop } from "react-dnd";
import useHover from "../../hooks/useHover";
import Tooltip from "../Utils/Tooltip";
import { guests, signalItem, table } from '../../utils/Interfaces';
import { EventContextProvider } from "../../context";

interface propsMesaComponent {
  posicion: number;
  mesa: table;
  AddInvitado: CallableFunction;
  invitados: guests[];
}

enum types {
  radio,
  relative,
}
type tableType = {
  position: any;
  component: any;
  type: keyof typeof types;
};
type schemaType = {
  redonda: tableType;
  imperial: tableType;
  cuadrada: tableType;
  podio: tableType;
};

const MesaComponent: FC<propsMesaComponent> = ({
  posicion,
  mesa,
  AddInvitado,
  invitados,
}) => {
  const { cantidad_sillas } = mesa;
  const [nSillas, setNSillas] = useState([]);

  // Crear array a partir de un numero para poder renderizar sillas
  const ArraySillas: CallableFunction = (): number[] => {
    let arr = [];
    for (let i = 0; i < mesa?.cantidad_sillas; i++) {
      arr.push(i);
    }
    return arr;
  };

  const posiciones = {
    redonda: posicion,
    cuadrada: [0, 90, 180, 270],
    podio: ArraySillas(),
    imperial: ArraySillas(),
  };

  const schemaGeneral: schemaType = {
    redonda: {
      position: posicion,
      component: <MesaRedonda />,
      type: "radio",
    },
    imperial: {
      position: ArraySillas(),
      component: <MesaImperial />,
      type: "relative",
    },
    cuadrada: {
      position: [0, 90, 180, 270],
      component: <MesaCuadrada />,
      type: "radio",
    },
    podio: {
      position: ArraySillas(),
      component: <MesaPodio />,
      type: "relative",
    },
  };

  // Setear estado con el array correspondiente
  useEffect(() => {
    setNSillas(posiciones[mesa?.tipo]);
  }, []);

  if (["imperial"].includes(mesa.tipo)) {
    return cloneElement(schemaGeneral[mesa.tipo].component, {
      mesa,
      nSillas,
      invitados,
      AddInvitado,
    });
  } else {
    return cloneElement(schemaGeneral[mesa.tipo].component, {
      cantidad_sillas,
      children: nSillas?.map((valor, idx) => {
        return (
          <Chair
            key={idx}
            index={idx}
            tipoMesa={mesa?.tipo}
            posicion={valor}
            AddInvitado={AddInvitado}
            nombre_mesa={mesa?.nombre_mesa}
            className={schemaGeneral[mesa.tipo].type}
          >
            {invitados?.map((invitado, index) => {
              if (invitado.puesto == idx) {
                return (
                  <SentadoItem
                    key={index}
                    posicion={valor}
                    invitado={invitado}
                  />
                );
              }
            })}
          </Chair>
        );
      }),
    });
  }
};

export default MesaComponent;

interface propsChair {
  posicion?: number;
  AddInvitado: CallableFunction;
  nombre_mesa: string;
  index: number;
  className: string;
  tipoMesa: string;
  children?: ReactNode;
}

const Chair: FC<propsChair> = ({
  posicion,
  children,
  AddInvitado,
  nombre_mesa,
  index,
  className,
}) => {
  const { setEvent } = EventContextProvider()
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "invitado",
    drop: (item: signalItem) => {
      if (item) {
        console.log("ES DENTRO DE LA SILLA", item, nombre_mesa, index)
        AddInvitado({ ...item, nombre_mesa, index }, setEvent);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <>
      <div
        ref={drop}
        role={"Droppeable"}
        className={`silla w-5 h-5 rounded-full absolute border-2 shadow border-gray-500 overflow-hidden  ${isOver ? "bg-opacity-50" : null
          }  ${isOver || canDrop ? "bg-secondary" : "bg-white"
          } flex items-center justify-center ${className}`}
      >
        {children}
      </div>
      <style jsx>
        {`
          .radio {
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            transform: rotate(${posicion}deg) translate(200%);
          }
        `}
      </style>
    </>
  );
};


interface propsTableType {
  cantidad_sillas?: number
  children?: ReactNode
}

const MesaRedonda: FC<propsTableType> = ({ cantidad_sillas, children }) => {
  return (
    <div
      className="rounded-full transform bg-white w-20 h-20 shadow border border-gray-500 relative "
    >
      {children}
    </div>
  );
};

const MesaCuadrada: FC<propsTableType> = ({ cantidad_sillas, children }) => {
  return (
    <div
      className="w-20 h-20 shadow border border-gray-500 relative bg-white"
    >
      {children}
    </div>
  );
};

const MesaPodio: FC<propsTableType> = ({ cantidad_sillas, children }) => {
  return (
    <div
      className="w-max h-20 shadow border border-gray-500 relative bg-white"
    >
      <div className="flex gap-4 w-full px-6 transform -translate-y-1/2">
        {children}
      </div>
    </div>
  );
};


interface propsMesaImperial {
  mesa?: table,
  AddInvitado?: CallableFunction
  invitados?: guests[]
}
const MesaImperial: FC<propsMesaImperial> = ({ mesa, AddInvitado, invitados }) => {
  const [arrTotal, setArrTotal] = useState(() => {
    let arr = [];
    for (let i = 0; i < mesa?.cantidad_sillas; i++) {
      arr.push(i);
    }
    return arr;
  });
  const [Sillas, setSillas] = useState({
    total: mesa?.cantidad_sillas - 2,
    rowOne: () => {
      let arr = [];
      if (mesa?.cantidad_sillas - 2 !== 0) {
        arr = arrTotal.slice(2, Math.ceil((mesa?.cantidad_sillas - 2) / 2) + 2);
      }
      return arr;
    },
    rowTwo: () => {
      let arr = [];
      if (mesa?.cantidad_sillas - 2 !== 0) {
        arr = arrTotal.slice(Sillas.rowOne()?.length + 2);
      }
      return arr;
    },
  });

  return (
    <div className="w-40 left-0 h-20 bg-white shadow border border-gray-500 relative">
      <Chair
        tipoMesa={mesa.tipo}
        AddInvitado={AddInvitado}
        nombre_mesa={mesa.nombre_mesa}
        className="absolute flex my-auto inset-y-0 left-1 transform -translate-x-full"
        index={0}
      >
        {invitados?.map((invitado, idx) => {
          if (invitado.puesto == 0) {
            return <SentadoItem key={idx} invitado={invitado} />;
          }
        })}
      </Chair>

      <Chair
        tipoMesa={mesa.tipo}
        AddInvitado={AddInvitado}
        nombre_mesa={mesa.nombre_mesa}
        className="absolute my-auto inset-y-0 right-1 transform translate-x-full"
        index={1}
      >
        {invitados?.map((invitado, idx) => {
          if (invitado.puesto == 1) {
            return <SentadoItem key={idx} invitado={invitado} />;
          }
        })}
      </Chair>

      <div className="w-full mx-auto inset-x-0 flex px-3 justify-between absolute top-1 transform -translate-y-full">
        {Sillas.rowOne().map((item, idx) => (
          <Chair
            tipoMesa={mesa.tipo}
            AddInvitado={AddInvitado}
            nombre_mesa={mesa.nombre_mesa}
            className="relative"
            key={idx}
            index={item}
          >
            {invitados?.map((invitado, index) => {
              if (invitado.puesto == item) {
                return <SentadoItem key={index} invitado={invitado} />;
              }
            })}
          </Chair>
        ))}
      </div>

      <div className="w-full mx-auto inset-x-0 flex px-3 justify-between absolute bottom-1 transform translate-y-full">
        {Sillas.rowTwo().map((item, idx) => (
          <Chair
            tipoMesa={mesa.tipo}
            AddInvitado={AddInvitado}
            nombre_mesa={mesa.nombre_mesa}
            className="relative"
            key={idx}
            index={item}
          >
            {invitados?.map((invitado, index) => {
              if (invitado.puesto == item) {
                return <SentadoItem key={index} invitado={invitado} />;
              }
            })}
          </Chair>
        ))}
      </div>
    </div>
  );
};

interface propsSentadoItem {
  invitado: guests,
  posicion?: number
}
const SentadoItem: FC<propsSentadoItem> = ({ invitado, posicion }) => {
  const [hoverRef, isHovered] = useHover();
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: "invitado",
    item: { tipo: "invitado", invitado: { _id: invitado._id } },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  }));

  return (
    <>
      {invitado ? (
        <div>
          <div
            className={`w-5 h-5 bg-primary rounded-full text-xs relative grid place-items-center correccion -rotate-90`}
            ref={drag}
          >
            <div
              className="absolute w-full h-full rounded-full"
              ref={dragPreview}
            />
            <p className="font-display font-light text-white">
              {invitado.nombre.slice(0, 1)}
            </p>
            {isHovered && <Tooltip text={invitado?.nombre} />}
          </div>
        </div>
      ) : null}
      <style jsx>
        {`
          .correccion {
            transform: rotate(-${posicion}deg);
          }
        `}
      </style>
    </>
  );
};
