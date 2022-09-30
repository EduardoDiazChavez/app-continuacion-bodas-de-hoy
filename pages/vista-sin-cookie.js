import FormLogin from "../components/Forms/FormLogin";
import { LogoNuevoBodasBlanco } from "../components/icons";
import Link from "next/link";

const VistaSinCookie = () => {
  return (
    <>
      <Link href={`${process.env.NEXT_PUBLIC_DIRECTORY}/login?d=app` ?? ""} passHref >
      <div className="h-screen w-screen float-right text-gray-500 font-display cursor-pointer section">
        <div className="mx-auto md:w-1/2 mt-40">
          <div className="md:pb-6 md:w-1/2 mx-auto ">
            <h2 className="w-full text-2xl font-bold font-display text-center pb-3">Te invito a iniciar sesion en </h2>
            
              <samp className="flex justify-center">

                <LogoNuevoBodasBlanco className="text-primary" />

              </samp>
            
            <p className="px-20 md:px-0 pt-3 md:text-sm  text-center">
              Para poder utilizar la aplicación y organizar el evento de tus sueños
            </p>
          </div>
        </div>
      </div>
      </Link>
      <style jsx>
          {`
              .section {
                height: calc(100vh - 190px);
              }
            `}
        </style>
    </>
  );
}

export default VistaSinCookie