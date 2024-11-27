import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Chart from "react-google-charts";

const DashBoardPage = () => {
  const [userCount, setUserCount] = useState(0);
  const [productChartData, setProductChartData] = useState([]);
  const [userActionsChartData, setUserActionsChartData] = useState([]);
  const [totalAddedActions, setTotalAddedActions] = useState(0); // Métrica para actions
  const [mostVisitedProductsChartData, setMostVisitedProductsChartData] =
    useState([]);
  const [topUsersByClicksChartData, setTopUsersByClicksChartData] = useState(
    []
  );

  const [cartActionsCount, setCartActionsCount] = useState(0); // Métrica para cartActions
  const [mostAddedProductsChartData, setMostAddedProductsChartData] = useState(
    []
  );
  const [topUsersAddingChartData, setTopUsersAddingChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener usuarios
        const usersSnapshot = await getDocs(collection(db, "users"));
        const users = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserCount(users.length);

        // Crear un diccionario de userId -> userName
        const userIdToNameMap = users.reduce((acc, user) => {
          acc[user.id] = user.name || "Usuario desconocido";
          return acc;
        }, {});

        // Obtener productos
        const productsSnapshot = await getDocs(collection(db, "products"));
        const products = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Crear un diccionario de productId -> productName
        const productIdToNameMap = products.reduce((acc, product) => {
          acc[product.id] = product.name || "Producto desconocido";
          return acc;
        }, {});

        // Obtener datos de acciones (colección "actions")
        const actionsSnapshot = await getDocs(collection(db, "actions"));
        const actions = actionsSnapshot.docs.map((doc) => doc.data());

        // Total de acciones registradas
        setTotalAddedActions(actions.length);

        // Gráfico: Productos más visitados
        const productVisitCounts = actions.reduce((acc, action) => {
          acc[action.productId] = (acc[action.productId] || 0) + 1;
          return acc;
        }, {});

        const mostVisitedProductsChartData = [["Producto", "Cantidad"]];
        for (const [productId, count] of Object.entries(productVisitCounts)) {
          const productName =
            productIdToNameMap[productId] || "Producto desconocido";
          mostVisitedProductsChartData.push([productName, count]);
        }
        setMostVisitedProductsChartData(mostVisitedProductsChartData);

        // Gráfico: Usuarios por cantidad de clics
        const userClickCounts = actions.reduce((acc, action) => {
          acc[action.userId] = (acc[action.userId] || 0) + 1;
          return acc;
        }, {});

        const topUsersByClicksChartData = [["Usuario", "Cantidad de Clics"]];
        for (const [userId, count] of Object.entries(userClickCounts)) {
          const userName = userIdToNameMap[userId] || "Usuario desconocido";
          topUsersByClicksChartData.push([userName, count]);
        }
        setTopUsersByClicksChartData(topUsersByClicksChartData);

        // Obtener datos de cartActions
        const cartActionsSnapshot = await getDocs(
          collection(db, "cartActions")
        );
        const cartActions = cartActionsSnapshot.docs.map((doc) => doc.data());
        setCartActionsCount(cartActions.length);

        // Gráfico: Productos más agregados al carrito
        const productAddCounts = cartActions.reduce((acc, action) => {
          acc[action.productId] =
            (acc[action.productId] || 0) + action.quantityAdded;
          return acc;
        }, {});

        const mostAddedProductsChartData = [["Producto", "Cantidad"]];
        for (const [productId, count] of Object.entries(productAddCounts)) {
          const productName =
            productIdToNameMap[productId] || "Producto desconocido";
          mostAddedProductsChartData.push([productName, count]);
        }
        setMostAddedProductsChartData(mostAddedProductsChartData);

        // Gráfico: Usuarios que más productos han agregado
        const userAddCounts = cartActions.reduce((acc, action) => {
          acc[action.userId] = (acc[action.userId] || 0) + action.quantityAdded;
          return acc;
        }, {});

        const topUsersAddingChartData = [
          ["Usuario", "Cantidad Total Agregada"],
        ];
        for (const [userId, count] of Object.entries(userAddCounts)) {
          const userName = userIdToNameMap[userId] || "Usuario desconocido";
          topUsersAddingChartData.push([userName, count]);
        }
        setTopUsersAddingChartData(topUsersAddingChartData);
      } catch (error) {
        console.error("Error al obtener datos para el DashBoard:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-red-600 mb-6">DashBoard</h1>

      {/* Cantidad de usuarios */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Cantidad de Usuarios</h2>
        <p className="text-lg bg-white p-4 rounded shadow">{userCount}</p>
      </div>

      {/* Total de acciones registradas */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Total de Acciones Registradas
        </h2>
        <p className="text-lg bg-white p-4 rounded shadow">
          {totalAddedActions}
        </p>
      </div>

      {/* Gráfico: Productos más visitados */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Productos más Visitados</h2>
        <div className="bg-white p-4 rounded shadow">
          {mostVisitedProductsChartData.length > 1 ? (
            <Chart
              chartType="BarChart"
              width="100%"
              height="400px"
              data={mostVisitedProductsChartData}
              options={{
                title: "Productos más visitados",
                chartArea: { width: "50%" },
                hAxis: { title: "Cantidad", minValue: 0 },
                vAxis: { title: "Producto" },
              }}
            />
          ) : (
            <p className="text-gray-500">No hay datos disponibles.</p>
          )}
        </div>
      </div>

      {/* Gráfico: Usuarios por cantidad de clics */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Usuarios por Cantidad de Clics
        </h2>
        <div className="bg-white p-4 rounded shadow">
          {topUsersByClicksChartData.length > 1 ? (
            <Chart
              chartType="PieChart"
              width="100%"
              height="400px"
              data={topUsersByClicksChartData}
              options={{
                title: "Usuarios con más clics",
                is3D: true,
              }}
            />
          ) : (
            <p className="text-gray-500">No hay datos disponibles.</p>
          )}
        </div>
      </div>

      {/* Gráfico: Total de productos agregados */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Total de Productos Agregados
        </h2>
        <p className="text-lg bg-white p-4 rounded shadow">
          {cartActionsCount}
        </p>
      </div>

      {/* Gráfico: Productos más agregados al carrito */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Productos más Agregados</h2>
        <div className="bg-white p-4 rounded shadow">
          {mostAddedProductsChartData.length > 1 ? (
            <Chart
              chartType="BarChart"
              width="100%"
              height="400px"
              data={mostAddedProductsChartData}
              options={{
                title: "Productos más agregados al carrito",
                chartArea: { width: "50%" },
                hAxis: { title: "Cantidad Total Agregada", minValue: 0 },
                vAxis: { title: "Producto" },
              }}
            />
          ) : (
            <p className="text-gray-500">No hay datos disponibles.</p>
          )}
        </div>
      </div>

      {/* Gráfico: Usuarios que más productos han agregado */}
      <div>
        <h2 className="text-xl font-semibold mb-2">
          Usuarios que más Productos han Agregado
        </h2>
        <div className="bg-white p-4 rounded shadow">
          {topUsersAddingChartData.length > 1 ? (
            <Chart
              chartType="PieChart"
              width="100%"
              height="400px"
              data={topUsersAddingChartData}
              options={{
                title: "Usuarios que más productos han agregado",
                is3D: true,
              }}
            />
          ) : (
            <p className="text-gray-500">No hay datos disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashBoardPage;
