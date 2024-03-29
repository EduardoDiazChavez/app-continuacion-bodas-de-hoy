
import React, { FC, useEffect, useRef, useState } from "react";
import { AuthContextProvider, EventContextProvider } from "../context";
import FormCrearMesa from "../components/Forms/FormCrearMesa";
import BlockPanelMesas from "../components/Mesas/BlockPanelMesas";
import BlockResumen from "../components/Mesas/BlockResumen";
import BlockInvitados from "../components/Mesas/BlockInvitados";
import ModalMesa from "../components/Mesas/ModalMesa";
import { useDelayUnmount } from "../utils/Funciones";
import ModalLeft from "../components/Utils/ModalLeft";
import FormInvitado from "../components/Forms/FormInvitado";
import Breadcumb from "../components/DefaultLayout/Breadcumb";
import { guests } from "../utils/Interfaces";
import VistaSinCookie from "./vista-sin-cookie";
import SwiperCore, { Pagination, Navigation } from 'swiper';
import Prueba from "../components/Mesas/prueba";
import FormEditarMesa from "../components/Forms/FormEditarMesa";

SwiperCore.use([Pagination]);

const Mesas: FC = () => {
  const { event } = EventContextProvider();
  const [modelo, setModelo] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showFormEditar, setShowFormEditar] = useState<any>({ mesa: {}, visible: false });
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const shouldRenderChild = useDelayUnmount(isMounted, 500);
  const [filterGuests, setFilterGuests] = useState<{ sentados: guests[], noSentados: guests[] }>({ sentados: [], noSentados: [] })
  const [showTables, setShowTables] = useState<boolean>(true)

  useEffect(() => {
  }, [showFormEditar])

  useEffect(() => {
    setFilterGuests(event?.invitados_array?.reduce((acc, guest) => {
      if (event?.mesas_array?.map(table => table.nombre_mesa).includes(guest.nombre_mesa)) {
        acc.sentados.push(guest)
      } else {
        acc.noSentados.push(guest)
      }
      return acc
    }, { sentados: [], noSentados: [] }))
  }, [event?.invitados_array, event?.mesas_array])

  const { user, verificationDone } = AuthContextProvider()
  if (verificationDone) {
    if (!user) {
      return (
        <VistaSinCookie />
      )
    }
    return (
      <>
        {/* formulario emergente para crear mesas */}
        {showForm ? (
          <ModalMesa set={setShowForm} state={showForm} title="Añadir mesa">
            <FormCrearMesa
              modelo={modelo}
              set={setShowForm}
              state={showForm}
            />
          </ModalMesa>
        ) : null}
        {/* formulario emergente para editar mesas */}
        {showFormEditar.visible ? (
          <ModalMesa set={setShowFormEditar} state={showFormEditar} title={`Mesa: "${showFormEditar.mesa.nombre_mesa}"`}>
            <FormEditarMesa
              modelo={modelo}
              set={setShowFormEditar}
              state={showFormEditar}
            />
          </ModalMesa>
        ) : null}
        {/* formulario emergente para agregar un invitado */}
        {shouldRenderChild && (
          <ModalLeft state={isMounted} set={setIsMounted}>
            <FormInvitado
              state={isMounted}
              set={setIsMounted}
            />
          </ModalLeft>
        )}
        <div>
          <div className="">
            <section id="areaDrag" className={`w-full grid md:grid-cols-12 bg-base overflow-hidden`}>
              {/* movil */}
              <div className="flex md:hidden h-[calc(250px)] flex-col ">
                <div className="p-2 px-4">
                  <div className="w-[calc(100vw-30px)] h-[calc(250px)] justify-start items-center truncate">
                    <div className={`${!showTables && 'hidden'} flex flex-col justify-start items-center transform transition duration-700`}>
                      <div className=" w-[calc(100vw-30px)] ">
                        <BlockPanelMesas
                          setModelo={setModelo}
                          state={showForm}
                          set={setShowForm}
                        />
                      </div>
                      <BlockResumen InvitadoSentados={filterGuests?.sentados} />
                    </div>
                    <div className={`${showTables && 'hidden'} flex flex-col justify-start items-center transform transition duration-700`}>
                      <BlockInvitados
                        set={setIsMounted}
                        InvitadoNoSentado={filterGuests?.noSentados}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* web */}
              <div className={`hidden md:flex h-[calc(100vh-144px)] col-span-3 box-border px-2 flex-col transform transition duration-700 overflow-y-auto`}>
                <div className="h-[260px]">
                  <Breadcumb />
                  <BlockPanelMesas
                    setModelo={setModelo}
                    state={showForm}
                    set={setShowForm}
                  />
                  <BlockResumen InvitadoSentados={filterGuests?.sentados} />
                </div>
                <div className="bg-white h-[calc(100vh-144px-260px)]">

                  <BlockInvitados
                    set={setIsMounted}
                    InvitadoNoSentado={filterGuests?.noSentados}
                  />
                </div>
              </div>
              <div className="pt-2 md:pt-0 md:block flex justify-center items-center ">
                <Prueba setShowTables={setShowTables} showTables={showTables} setShowFormEditar={setShowFormEditar} />
              </div>
            </section>
            <div className="md:hidden w-full h-[80px]" />
          </div>
          <style>
            {`
            section {
              height: calc(100vh - 9rem);
            }
          `}
          </style>
        </div>
      </>
    );
  }
};

export default Mesas;
