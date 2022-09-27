import React, { FC } from "react";
import { EventContextProvider } from "../../context";
import { guests, signalItem } from "../../utils/Interfaces";
import DragInvitado from "./DragInvitado";

interface propsListInvitados {
  InvitadoNoSentado: guests[]
  AddInvitado: CallableFunction
}

const ListInvitados: FC<propsListInvitados> = ({ InvitadoNoSentado, AddInvitado }) => {
  const { setEvent } = EventContextProvider()

  return (
    <>
      <div id={"listInvitados"} className="js-drop w-full py-4" >
        {InvitadoNoSentado?.map((invitado, index) => (
          <DragInvitado
            key={invitado._id}
            tipo={"invitado"}
            index={index}
            invitado={invitado}
          />
        ))}
      </div>
      <style jsx>
        {`
        ul {
          min-height: 15rem
        }
        `}
      </style>
    </>
  );
};

export default ListInvitados;
