import { useState, useEffect } from "react";
import styles from "./App.module.css";
import { IoAddCircleOutline, IoTrashBinOutline } from "react-icons/io5";
import { GrPowerReset } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import {
  updateElements,
  updateMiu,
  updateG,
  updateResults,
} from "./app/slices/Elements.slice";

const App = () => {
  const dispatch = useDispatch();
  const elements = useSelector((state) => state.elements.elements);
  const results = useSelector((state) => state.elements.results);
  const [caja1, setCaja1] = useState({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
    masa: 0,
  });
  const [caja2, setCaja2] = useState({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
    masa: 0,
  });
  const [cuerda1, setCuerda1] = useState({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
  });
  const [cuerda2, setCuerda2] = useState({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
  });
  const [base, setBase] = useState({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
  });
  const [polea, setPolea] = useState({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
  });
  const [resultados, setResultados] = useState({
    normal: 0,
    fr: 0,
    aceleracion: 0,
    tension: 0,
  });

  useEffect(() => {
    const caja1Element = document.getElementById("caja1");
    const caja2Element = document.getElementById("caja2");
    const cuerda1Element = document.getElementById("cuerda1");
    const cuerda2Element = document.getElementById("cuerda2");
    const baseElement = document.getElementById("base");
    const poleaElement = document.getElementById("polea");
    const caja1Data = caja1Element.getBoundingClientRect();
    const caja2Data = caja2Element.getBoundingClientRect();
    const cuerda1Data = cuerda1Element.getBoundingClientRect();
    const cuerda2Data = cuerda2Element.getBoundingClientRect();
    const baseData = baseElement.getBoundingClientRect();
    const poleaData = poleaElement.getBoundingClientRect();
    setCaja1(caja1Data);
    setCaja2(caja2Data);
    setCuerda1(cuerda1Data);
    setCuerda2(cuerda2Data);
    setBase(baseData);
    setPolea(poleaData);
    return () => {};
  }, []);

  useEffect(() => {
    const caja1Element = document.getElementById("caja1");
    const caja2Element = document.getElementById("caja2");
    const cuerda1Element = document.getElementById("cuerda1");
    const cuerda2Element = document.getElementById("cuerda2");
    const poleaElement = document.getElementById("polea");
    caja1Element.style.bottom = `${base.height}px`;
    caja1Element.style.left = `${base.width / 2}px`;
    caja2Element.style.bottom = `${base.height / 4}px`;
    caja2Element.style.left = `${base.width + 5}px`;
    poleaElement.style.bottom = `${base.height + 3}px`;
    poleaElement.style.left = `${base.width + 3}px`;
    cuerda1Element.style.bottom = `${base.height - caja2.height + 10}px`;
    cuerda1Element.style.left = `${base.width + 10 + 30}px`;
    cuerda2Element.style.bottom = `${base.height + caja1.height / 2}px`;
    cuerda2Element.style.left = `${base.width - caja1.width}px`;
  }, [caja1, caja2, cuerda1, cuerda2, base, polea]);

  useEffect(() => {
    console.log(results);
    let masa = parseFloat(elements[0].masa);
    let g = parseFloat(elements[0].g);
    let masa2 = parseFloat(elements[1].masa);
    let miu = parseFloat(elements[0].miu);
    let normal = masa * g;
    let fr = miu * normal;
    let aceleracion = (masa2 * g - fr) / (masa + masa2);
    let tension = masa * ((masa2 * g - fr) / (masa + masa2)) + fr;
    if (isNaN(normal)) normal = 0;
    if (isNaN(fr)) fr = 0;
    if (isNaN(aceleracion)) aceleracion = 0;
    if (isNaN(tension)) tension = 0;
    if (aceleracion < 0) aceleracion = 0;
    setResultados({
      normal: normal.toFixed(2),
      fr: fr.toFixed(2),
      aceleracion: aceleracion.toFixed(2),
      tension: tension.toFixed(2),
    });
  }, [elements, results]);

  useEffect(() => {
    dispatch(updateResults(resultados));
  }, [resultados, dispatch]);

  return (
    <div className={styles.App}>
      <main className={styles.hpmain}>
        {/* area grafica */}
        <div className={styles.triangle}></div>
        <div className={styles.title}>
          <h1>Fisica - Dinámica de la particula</h1>
        </div>
        <div className={styles.graphic}>
          <div className={styles.main}>
            <h3>Area Gráfica</h3>
            <div className={styles.caja1} id="caja1">
              <h4>Masa 1</h4>
              <p>{elements[0].masa} kg</p>
            </div>
            <div className={styles.caja2} id="caja2">
              <h4>Masa 2</h4>
              <p>{elements[1].masa} kg</p>
            </div>
            <div className={styles.polea} id="polea">
              <div className={styles.inner}></div>
            </div>
            <div className={styles.base} id="base"></div>
            <div className={styles.cuerda1} id="cuerda1"></div>
            <div className={styles.cuerda2} id="cuerda2"></div>
          </div>
        </div>
        <div className={styles.toolbox}>
          <form>
            <h3>Masa 1:</h3>
            <div>
              <input
                type="number"
                name="name"
                id="0"
                value={elements[0].masa}
                onChange={(e) => {
                  e.preventDefault();
                  dispatch(updateElements({ id: 0, masa: e.target.value }));
                }}
              />
              <button className={styles.buttonAdd}>
                <IoAddCircleOutline
                  className={styles.icon}
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                />
              </button>
              <button className={styles.buttonDel}>
                <IoTrashBinOutline
                  className={styles.icon}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(updateElements({ id: 0, masa: 0 }));
                  }}
                />
              </button>
            </div>
          </form>
          <form>
            <h3>Masa 2:</h3>
            <div>
              <input
                type="number"
                name="name"
                value={elements[1].masa}
                onChange={(e) => {
                  dispatch(updateElements({ id: 1, masa: e.target.value }));
                }}
              />
              <button className={styles.buttonAdd}>
                <IoAddCircleOutline
                  className={styles.icon}
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                />
              </button>
              <button className={styles.buttonDel}>
                <IoTrashBinOutline
                  className={styles.icon}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(updateElements({ id: 1, masa: 0 }));
                  }}
                />
              </button>
            </div>
          </form>
          <form>
            <h3>Coeficiente de rozamiento (μ):</h3>
            <div>
              <input
                type="number"
                name="name"
                value={elements[0].miu}
                onChange={(e) => {
                  e.preventDefault();
                  dispatch(updateMiu({ id: 0, miu: e.target.value }));
                }}
              />
              <button className={styles.buttonAdd}>
                <IoAddCircleOutline
                  className={styles.icon}
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                />
              </button>
              <button className={styles.buttonDel}>
                <IoTrashBinOutline
                  className={styles.icon}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(updateMiu({ id: 0, miu: 0 }));
                  }}
                />
              </button>
            </div>
          </form>
          <form>
            <h3>Gravedad (g):</h3>
            <div>
              <input
                type="number"
                name="name"
                value={elements[0].g}
                onChange={(e) => {
                  e.preventDefault();
                  dispatch(updateG({ id: 0, g: e.target.value }));
                }}
              />
              <button className={styles.buttonAdd}>
                <IoAddCircleOutline
                  className={styles.icon}
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                />
              </button>
              <button className={styles.buttonDel}>
                <GrPowerReset
                  className={styles.icon}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(updateG({ id: 0, g: 9.8 }));
                  }}
                />
              </button>
            </div>
          </form>
          <div className={styles.results}>
            <h3>Resultados: </h3>
            <div className={styles.result}>
              <h5>Normal: </h5>
              <p>{results[0].normal} N</p>
            </div>
            <div className={styles.result}>
              <h5>Fuerza de Rozamiento: </h5>
              <p>{results[0].fr} N</p>
            </div>
            <div className={styles.result}>
              <h5>Aceleracion: </h5>
              <p>{results[0].aceleracion} m/s²</p>
            </div>
            <div className={styles.result}>
              <h5>Tension: </h5>
              <p>{results[0].tension} N</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
