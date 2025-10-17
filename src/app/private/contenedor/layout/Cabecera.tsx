import { useNavigate } from "react-router-dom"
import fotoAvatar from "../../../../assets/img/fotoSesion.jpg"
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import { DarkMode, HomeRepairServiceOutlined, LightMode } from "@mui/icons-material";
import PublicIcon from '@mui/icons-material/Public';
import { IconButton } from "@mui/material";
import { useThemeContext } from "../../../shared/components/Theme/ThemeContext";

export const Cabecera = () => {

    const { mode, toggleTheme } = useThemeContext();

    const navegacion = useNavigate();
    const cerrarSesion = () => {
        localStorage.removeItem("TOKEN_AUTORIZACION")
        navegacion("/login");
    }

    const token: any = localStorage.getItem("TOKEN_AUTORIZACION")
    const datosUsuario: any = jwtDecode(token);




    return (
        <nav className="navbar navbar-top navbar-expand navbar-dashboard navbar-dark ps-0 pe-2 pb-0">
            <div className="container-fluid px-0">
                <div className="d-flex justify-content-between w-100" id="navbarSupportedContent">
                    <div className="d-flex align-items-center">
                        <form className="navbar-search form-inline" id="navbar-search-main">
                            <div className="input-group input-group-merge search-bar">
                                <span className="input-group-text" id="topbar-addon">
                                    <i className="fa fa-search"></i>
                                </span>
                                <input type="text" className="form-control" id="topbarInputIconLeft" placeholder="Search" aria-label="Search" aria-describedby="topbar-addon" />
                            </div>
                        </form>
                    </div>
                    <ul className="navbar-nav align-items-center">
                        <Link
                            to="/land"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <PublicIcon fontSize="large" />
                        </Link>
                        <IconButton onClick={toggleTheme} color="inherit">
                            {mode === 'light' ? <DarkMode /> : <LightMode />}
                        </IconButton>
                        <li className="nav-item dropdown ms-lg-3">
                            <a className="nav-link dropdown-toggle pt-1 px-0" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <div className="media d-flex align-items-center">
                                    <img className="avatar rounded-circle" alt="" src={fotoAvatar} height={"50px"} width={"60px"} />
                                    <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                                        <span className="mb-0 font-small fw-bold text-gray-900">{datosUsuario.nombre}</span>
                                    </div>
                                </div>
                            </a>
                            <div className="dropdown-menu dashboard-dropdown dropdown-menu-end mt-2 py-1">
                                <Link
                                    className="dropdown-item d-flex align-items-center"
                                    to="/dash/listUser"
                                >
                                    <i className="fa fa-user-circle fs-5 mx-2 text-info"></i>
                                    Perfil
                                </Link>
                                <a className="dropdown-item d-flex align-items-center" href="#">
                                    <i className="fa fa-gear fs-5 mx-2 text-info"></i>
                                    Configuración
                                </a>
                                <a className="dropdown-item d-flex align-items-center" href="#">
                                    <i className="fa fa-message fs-5 mx-2 text-info"></i>
                                    Mensajes
                                </a>
                                <div role="separator" className="dropdown-divider my-1"></div>
                                <a className="dropdown-item d-flex align-items-center" href="#" onClick={cerrarSesion}>
                                    <i className="fa-solid fa-right-from-bracket fs-5 mx-2 text-danger"></i>
                                    Cerrar Sesion
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )



}