import NavBar from "@/components/NavBar";
import { AuthProvider } from "@/context/auth";
import "@/styles/globals.css";
import Axios from "axios";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  Axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL + "/api";
  Axios.defaults.withCredentials = true;

  const {pathname} = useRouter();
  const autoRoutes = ["/register", "/login"];
  const autoRoute = autoRoutes.includes(pathname);

  return <AuthProvider>
    {!autoRoute && <NavBar/>}
    <div className={autoRoute ? "": "pt-12"}>
      <Component {...pageProps} />;
    </div>
  </AuthProvider>
}
