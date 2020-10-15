import React, { useEffect, useState } from "react";
import mapMarker from "../../assets/map-marker.svg";
import { Link } from "react-router-dom";
import { FiPlus, FiMoon, FiSun, FiArrowRight } from "react-icons/fi";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import Api from "../../services/Api";
import MapIcon from "../../utils/mapIcon";
import ThemeContext from "../../userTheme";

import "./styles.css";

interface Orphanage {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

const OrphanageMap = () => {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
    useEffect(() => {
        Api.get("/orphanages").then(({ data }) => {
            setOrphanages(data);
        });
    }, []);

    return (
        <ThemeContext.Consumer>
            {({ theme, toggleTheme }) => (
                <div id="page-map">
                    <aside>
                        <header>
                            <img src={mapMarker} alt="Happy" />
                            <h2>Escolha um orfanato no mapa</h2>
                            <p>
                                Muitas crianças estão esperando a sua visita :)
                            </p>
                        </header>
                        <footer>
                            <strong>Cascavel</strong>
                            <span>Ceará</span>
                        </footer>
                    </aside>
                    <Map
                        center={[-4.1284891, -38.2562955]}
                        zoom={15}
                        style={{ width: "100%", height: "100%" }}
                    >
                        <TileLayer
                            url={`https://api.mapbox.com/styles/v1/mapbox/${theme}-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                        />
                        {orphanages.map((orphanage) => {
                            const { id, name, latitude, longitude } = orphanage;
                            return (
                                <Marker
                                    key={id}
                                    position={[latitude, longitude]}
                                    icon={MapIcon}
                                >
                                    <Popup
                                        closeButton={false}
                                        minWidth={240}
                                        maxHeight={240}
                                        className="map-popup"
                                    >
                                        {name}
                                        <Link to={`/orphanages/${id}`}>
                                            <FiArrowRight
                                                size={20}
                                                color="FFF"
                                            />
                                        </Link>
                                    </Popup>
                                </Marker>
                            );
                        })}
                    </Map>
                    <span className="change-theme" onClick={toggleTheme}>
                        {theme == "light" ? (
                            <FiSun size={32} color="FFFF00" />
                        ) : (
                            <FiMoon size={32} color="FFF" />
                        )}
                    </span>
                    <Link to="orphanages/create" className="create-orphanage">
                        <FiPlus size={32} color="FFF" />
                    </Link>
                </div>
            )}
        </ThemeContext.Consumer>
    );
};

export default OrphanageMap;
