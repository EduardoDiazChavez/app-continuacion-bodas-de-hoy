import { motion } from "framer-motion";
import Breadcumb from "../components/DefaultLayout/Breadcumb";
import {
  AmazonIcon,
  CochinoIcon,
  CompartirIcon,
  DineroIcon,
  ListaOne,
  ListaTwo,
} from "../components/icons";
import BlockTitle from "../components/Utils/BlockTitle";
import { EventContextProvider } from "../context";

const listaRegalos = () => {
const {event} = EventContextProvider()

  return (
    <>
      <section className="w-full bg-base">
        <motion.div initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }} className="max-w-screen-lg mx-auto inset-x-0 flex-col gap-6 flex pb-28 md:pb-10 px-5">
        
                <Breadcumb/> 
        
       
          <BlockTitle title={"Lista de regalos"} />
          <div className="w-full flex flex-col md:flex-row justify-center items-center gap-6 ">
            <div className="w-full md:w-1/2 bg-white shadow-lg flex gap-8 items-center justify-center p-6 rounded-xl">
              <DineroIcon className="w-12 h-12 text-gray-500" />
              <div className="font-display flex flex-col items-center">
                <h3 className="text-lg text-primary font-medium">
                  Valor total
                </h3>
                <p className="text-2xl text-gray-500 font-semibold">0.00 Є</p>
              </div>
              <div className="font-display flex flex-col justify-center text-sm text-gray-500">
                <p>Conseguido: 0.00 Є</p>
                <p>Contribuciones: 0.00 Є</p>
                <p>Pendiente: 0.00 Є</p>
              </div>
            </div>

            <div className="w-full md:w-1/2 bg-white shadow-lg flex gap-4 items-center justify-center p-6 rounded-xl">
              <CochinoIcon className="w-12 h-12 text-gray-500" />
              <div className="font-display flex flex-col items-start">
                <h3 className="text-lg text-primary font-medium">
                  Saldo transferible
                </h3>
                <p className="text-2xl text-gray-500 font-semibold">0.00 Є</p>
              </div>
            </div>
          </div>

          <div className="w-full bg-white shadow-lg flex gap-4 items-center justify-center p-6 rounded-xl">
            <AmazonIcon className="w-28 h-28 text-primary" />
            <div className="font-display flex flex-col items-start">
              <h3 className="text-lg text-gray-300 font-medium leading-5">
                Constribuye en vuestra lista de regalos
                <br />
                <span className="text-sm">
                  con millones de opciones para elegir.
                </span>
              </h3>
              <button className="button-secondary uppercase mt-2 text-sm">
                Crea tu lista de regalos en amazon
              </button>
            </div>
          </div>

          <h3 className="font-display text-xl text-gray-500 w-max inset-x-0 mx-auto pt-2 pb-2">
            ¿Como funciona la lista?
          </h3>
          <div className="w-full grid-cols-2 md:grid-cols-3 grid gap-6">
              {/* First Card */}
            <div className="bg-secondary rounded-xl shadow-lg col-span-1 flex justify-center flex-col items-center font-display h-max p-6 gap-4 hover:scale-105 transition duration-200 transform ">
              <ListaOne />
              <h3 className="text-lg font-semibold text-primary text-center leading-4 flex flex-col gap-2 ">
                Crea tu lista
                <br />
                <span className="font-semibold text-sm leading-4">
                  y elige tus regalos <br/> favoritos
                </span>
              </h3>
            </div>

            {/* Second Card */}
            <div className="bg-primary rounded-xl shadow-lg col-span-1 flex justify-center flex-col items-center font-display h-max p-6 gap-4 hover:scale-105 transition duration-200 transform ">
              <CompartirIcon className="text-white w-10 h-10" />
              <h3 className="text-lg font-semibold text-white text-center leading-4 flex flex-col gap-2 ">
                Compartela
                <br />
                <span className="font-normal text-sm leading-4">
                con tus invitados para <br/>que puedan participar
                </span>
              </h3>
            </div>

            {/* Tertiary Card */}
            <div className="bg-tertiary rounded-xl shadow-lg col-span-1 flex justify-center flex-col items-center font-display h-max p-6 gap-4 hover:scale-105 transition duration-200 transform ">
              <ListaTwo />
              <h3 className="text-lg font-semibold text-gray-300 text-center leading-4 flex flex-col gap-2 ">
              Transfiere el dinero
                <br />
                <span className="font-normal text-sm leading-4">
                con tus invitados para que <br/>puedan participar
                </span>
              </h3>
            </div>

          </div>
        </motion.div>
      </section>
      <style jsx>
        {`
          section {
            min-height: calc(100vh - 9rem);
          }
        `}
      </style>
    </>
  );
};

export default listaRegalos;
