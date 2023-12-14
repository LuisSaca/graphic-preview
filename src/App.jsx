import { useState, useEffect } from "react";
import styles from "./App.module.css";
import { IoAddCircleOutline, IoTrashBinOutline } from "react-icons/io5";
import { GrPowerReset } from "react-icons/gr";

const App = () => {
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
  const [caja1masa, setCaja1masa] = useState(50);
  const [caja2masa, setCaja2masa] = useState(40);
  const [miu, setMiu] = useState(0.5);
  const [gravedad, setGravedad] = useState(9.8);

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
    // triangulo
    // const triangleElement = document.querySelector(".triangle");
    // triangleElement.style.left = `${caja1.width + 5}px`;

    caja1Element.style.bottom = `${base.height}px`;
    caja1Element.style.left = `${base.width / 2}px`;

    caja2Element.style.bottom = `${base.height / 4}px`;
    caja2Element.style.left = `${base.width + 5}px`;

    // poleaElement.style.bottom = `${base.height + 10}px`;
    poleaElement.style.left = `${base.width + 5}px`;
  }, [caja1, caja2, cuerda1, cuerda2, base, polea]);

  // guardar en estado los resultados de la normal, la fuerza de rozamiento, la aceleracion y la tension
  const [normal, setNormal] = useState(0);
  const [fr, setFr] = useState(0);
  const [aceleracion, setAceleracion] = useState(0);
  const [tension, setTension] = useState(0);

  // hacer calculos para calcular la aceleracion, la fuerza de rozamiento y la tension
  useEffect(() => {
    let masa1 = caja1masa;
    let masa2 = caja2masa;
    let normal = masa1 * gravedad;
    let fr = miu * normal;
    let aceleracion = (fr - masa2 * gravedad) / (masa1 - masa2);
    let tension = fr - (masa1 * (fr - masa2 * gravedad)) / (masa1 - masa2);
    // redondear con 2 decimales la aceleracion y la tension
    aceleracion = aceleracion.toFixed(2);
    tension = tension.toFixed(2);
    normal = normal.toFixed(2);
    fr = fr.toFixed(2);
    setNormal(normal);
    setFr(fr);
    setAceleracion(aceleracion);
    setTension(tension);

    return () => {};
  }, [caja1masa, caja2masa, miu, gravedad]);

  // hacer cambios en interfaz segun los resultados
  // useEffect(() => {
  //   const caja1Element = document.getElementById("caja1");
  //   const caja2Element = document.getElementById("caja2");
  //   const cuerda1Element = document.getElementById("cuerda1");
  //   const cuerda2Element = document.getElementById("cuerda2");
  //   const poleaElement = document.getElementById("polea");

  //   // cuerda1Element.style.top = `${polea.top + polea.height}px`;
  //   // cuerda1Element.style.left = `${caja2.left + caja2.width / 2 - 2}px`;

  //   // cuerda2Element.style.top = `${caja1.top + caja1.height / 2}px`;
  //   // cuerda2Element.style.left = `${caja1.left + caja1.width}px`;

  //   // const pam = polea.left - (caja1.left + caja1.width);
  //   // cuerda2Element.style.width = `${pam}px`;

  //   // console.log(polea.top+polea.height);
  //   // console.log(caja2.top);
  //   // const pam2 = caja2.top - polea.top - polea.height;
  //   // cuerda1Element.style.height = `${pam2 + 5}px`;
  // }, [caja1masa, caja1, caja2, cuerda1, cuerda2, base, polea]);

  return (
    <div className={styles.App}>
      <main className={styles.hpmain}>
        {/* area grafica */}
        <div className={styles.triangle}></div>
        <div className={styles.title}>
          <h1>Fisica - Estatica de la particula</h1>
        </div>
        <div className={styles.graphic}>
          {/* titulo: FISICA */}
          <div className={styles.main}>
            <h3>Area Grafica</h3>
            {/* triangulo */}
            {/* cajas */}
            <div className={styles.caja1} id="caja1">
              <h4>Masa 1</h4>
              <p>{caja1masa} kg</p>
            </div>
            <div className={styles.caja2} id="caja2">
              <h4>Masa 2</h4>
              <p>{caja2masa} kg</p>
            </div>
            <div className={styles.polea} id="polea"></div>
            <div className={styles.base} id="base"></div>
            <div className={styles.cuerda1} id="cuerda1"></div>
            <div className={styles.cuerda2} id="cuerda2"></div>
          </div>
        </div>

        {/* 1025 651 */}
        {/* herramientas */}
        <div className={styles.toolbox}>
          <h3>Herramientas</h3>
          <h5>Masa 1</h5>
          <div className={styles.masa1}>
            <input
              type="number"
              name="masa"
              id="masa"
              placeholder="Masa:"
              onChange={(e) => {
                setCaja1masa(e.target.value);
              }}
              className={styles.input}
              value={caja1masa}
            />
            <button
              onClick={() => {
                setCaja1masa(caja1masa);
              }}
              className={styles.buttonAdd}
            >
              <IoAddCircleOutline className={styles.icon} />
            </button>
            <button
              onClick={() => {
                setCaja1masa(0);
              }}
              className={styles.buttonDel}
            >
              <IoTrashBinOutline className={styles.icon} />
            </button>
          </div>
          <h5>Masa 2</h5>
          <div className={styles.masa2}>
            <input
              type="number"
              name="masa"
              id="masa"
              placeholder="Masa:"
              onChange={(e) => {
                setCaja2masa(e.target.value);
              }}
              className={styles.masa2input}
              value={caja2masa}
            />
            <button
              onClick={() => {
                setCaja2({ ...caja2, masa: caja1masa });
              }}
              className={styles.buttonAdd}
            >
              <IoAddCircleOutline className={styles.icon} />
            </button>
            <button
              onClick={() => {
                setCaja2masa(0);
              }}
              className={styles.buttonDel}
            >
              <IoTrashBinOutline className={styles.icon} />
            </button>
          </div>
          <h5>Miu</h5>
          <div className={styles.miu}>
            <input
              type="number"
              name="miu"
              id="miu"
              placeholder="Miu:"
              className={styles.input}
              value={miu}
              onChange={(e) => {
                setMiu(e.target.value);
              }}
            />
            <button className={styles.buttonAdd}>
              <IoAddCircleOutline
                className={styles.icon}
                onClick={() => {
                  setMiu(miu);
                }}
              />
            </button>
            <button className={styles.buttonDel}>
              <IoTrashBinOutline
                className={styles.icon}
                onClick={() => {
                  setMiu(0.5);
                }}
              />
            </button>
          </div>
          <h5>Gravedad</h5>
          <div className={styles.gravedad}>
            <input
              type="number"
              name="gravedad"
              id="gravedad"
              placeholder="Gravedad:"
              className={styles.input}
              value={gravedad}
              onChange={(e) => {
                setGravedad(e.target.value);
              }}
            />
            <button className={styles.buttonAdd}>
              <IoAddCircleOutline
                className={styles.icon}
                onClick={() => {
                  setGravedad(gravedad);
                }}
              />
            </button>
            <button className={styles.buttonDel}>
              <GrPowerReset
                className={styles.icon}
                onClick={() => {
                  setGravedad(9.8);
                }}
              />
            </button>
          </div>

          {/* resultados */}
          <div className={styles.results}>
            <h3>Resultados</h3>
            <div className={styles.result}>
              <h5>Normal: </h5>
              <p>{normal} N</p>
            </div>
            <div className={styles.result}>
              <h5>Fuerza de Rozamiento: </h5>
              <p>{fr} N</p>
            </div>
            <div className={styles.result}>
              <h5>Aceleracion: </h5>
              <p>{aceleracion} m/s²</p>
            </div>
            <div className={styles.result}>
              <h5>Tension: </h5>
              <p>{tension} N</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
