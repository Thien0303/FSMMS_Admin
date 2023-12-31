import { CssBaseline, ThemeProvider } from "@mui/material";
import React, { Fragment, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import NotFound from "../pages/NotFound";
import FruitHistory from "../pages/expert/fruitHistory";
import SinglePost from "../pages/expert/post";
import CreateArticle from "../pages/expert/post/createPost";
import WeatherTable from "../pages/expert/weather";
import Login from "../pages/login/Login";
import { ColorModeContext, useMode } from "../theme";
import AdminRouter from "./AdminRouter";
import ExpertRouter from "./ExpertRouter";
import SupplierRouter from "./SupplierRouter";
import PostDetail from "../pages/expert/post/postDetail";
import GetListPost from "../pages/expert/post/getAllPost";
import ListProduct from "../pages/supplier/Product/ListProduct";
import CheckoutPage from "../pages/supplier/Product/CheckOut";
import ProductDetail from "../pages/supplier/Product/ListProductDetail";
import ChatIntro from "../pages/supplier/Chat/Chat";
import ProductForm from "../pages/supplier/Product/CreateProduct";
import ListFruitSupplier from "../pages/supplier/Product/ListFruitSupplier";
import FruitSupplierDetail from "../pages/supplier/Product/ListFruitDetail";
import DiscountSupplier from "../pages/supplier/Discount/DiscountSupplier";
import OrderSeller from "../pages/supplier/Order/OrderSeller";
import OrderBuyer from "../pages/supplier/Order/OrderBuyer";
import Register from "../pages/login/Register";
import ChatLayout from "../components/Layouts/ChatLayout";
import Dashboard from "../pages/admin/dashboard/Dashboard";
import GetUser from "../pages/admin/System/getUser";
import CreatePostAdmin from "../pages/admin/Post/CreatePost";
import GetListPostAdmin from "../pages/admin/Post/getAllPost";
import PostDetailAdmin from "../pages/admin/Post/getPostDetail";
import UpdatePost from "../pages/admin/Post/ManagePost";
import ForgotPassword from "../pages/login/ForgotPassword";
import CountPost from "../pages/expert/post/CountPost";
import GrowthTask from "../pages/admin/GrowthTask/GrowthTask";
import CropVarietyStages from "../pages/admin/GrowthTask/CropVarietyStages";
import ListCropVarities from "../pages/admin/GrowthTask/ListGrowthTask";
export const publicRouters = [
    {
        path: "/",
        name: "login",
        component: Login,
        layout: null,
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        layout: null,
    },
    {
        path: '/forgotPassword',
        name: 'forgotPassword',
        component: ForgotPassword,
        layout: null,
    },
    {
        path: "/error",
        name: "error",
        component: NotFound,
        layout: null,
    },
];

export const expertRouters = [
    {
        path: "/list",
        name: "listPost",
        component: GetListPost,
        layout: DefaultLayout,
    },
    {
        path: "/postdetail/:id",
        name: "postDetail",
        component: PostDetail,
        layout: DefaultLayout,
    },
    {
        path: "/create",
        name: "create",
        component: CreateArticle,
        layout: DefaultLayout,
    },
    {
        path: "/history",
        name: "history",
        component: FruitHistory,
        layout: DefaultLayout,
    },
    {
        path: "/weather",
        name: "weather",
        component: WeatherTable,
        layout: DefaultLayout,
    },
    {
        path: "/post",
        name: "post",
        component: SinglePost,
        layout: DefaultLayout,
    },
    {
        path: "/countPost",
        name: "countPost",
        component: CountPost,
        layout: DefaultLayout,
    },
];
export const supplierRouters = [
    {
        path: "/listproduct",
        name: "listFruit",
        component: ListProduct,
        layout: DefaultLayout,
    },
    {
        path: "/fruitDetail/:id",
        name: "fruitDetail",
        component: ProductDetail,
        layout: DefaultLayout,
    },
    {
        path: "/listFruitDetail/:id",
        name: "listFruitDetail",
        component: FruitSupplierDetail,
        layout: DefaultLayout,
    },
    {
        path: "/checkout",
        name: "checkout",
        component: CheckoutPage,
        layout: DefaultLayout,
    },
    {
        path: "/chat",
        name: "chat",
        component: ChatIntro,
        layout: ChatLayout,
    },
    {
        path: "/createFruit",
        name: "createFruit",
        component: ProductForm,
        layout: DefaultLayout,
    },
    {
        path: "/listFruit",
        name: "listFruit",
        component: ListFruitSupplier,
        layout: DefaultLayout,
    },
    {
        path: "/listDiscountFruit",
        name: "listDiscountFruit",
        component: DiscountSupplier,
        layout: DefaultLayout,
    },
    {
        path: "/listOrderSeller",
        name: "listOrderSeller",
        component: OrderSeller,
        layout: DefaultLayout,
    },
    {
        path: "/listOrderFruit",
        name: "listOrderFruit",
        component: OrderBuyer,
        layout: DefaultLayout,
    },
];
export const adminRouters = [
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        layout: DefaultLayout,
    },
    {
        path: '/getUser',
        name: 'getUser',
        component: GetUser,
        layout: DefaultLayout,
    },
    {
        path: '/createPost',
        name: 'createPost',
        component: CreatePostAdmin,
        layout: DefaultLayout,
    },
    {
        path: '/cropVarietyStages',
        name: 'cropVarietyStages',
        component: CropVarietyStages,
        layout: DefaultLayout,
    },
    {
        path: '/growthTask',
        name: 'growthTask',
        component: GrowthTask,
        layout: DefaultLayout,
    },
    {
        path: '/listgrowthTask',
        name: 'listgrowthTask',
        component: ListCropVarities,
        layout: DefaultLayout,
    },
    {
        path: "/postdetailAdmin/:id",
        name: "postDetailAdmin",
        component: PostDetailAdmin,
        layout: DefaultLayout,
    },
    {
        path: '/listAllPost',
        name: 'listAllPost',
        component: GetListPostAdmin,
        layout: DefaultLayout,
    },
    {
        path: '/updatePost',
        name: 'updatePost',
        component: UpdatePost,
        layout: DefaultLayout,
    },
];
//Scroll Top when clicked another page
function ScrollToTop() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return null;
}

export const RouterComponents = () => {
    const [theme, colorMode] = useMode();
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <div className="App">
                        <ScrollToTop />
                        <Routes>
                            {publicRouters.map((route, index) => {
                                const Page = route.component;
                                let Layout = DefaultLayout;
                                if (route.layout) {
                                    Layout = route.layout;
                                } else if (route.layout === null) {
                                    Layout = Fragment;
                                }
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                    />
                                );
                            })}
                            <Route exact path="/" element={<ExpertRouter />}>
                                {expertRouters.map((route, index) => {
                                    const Page = route.component;
                                    let Layout = DefaultLayout;
                                    if (route.layout) {
                                        Layout = route.layout;
                                    } else if (route.layout === null) {
                                        Layout = Fragment;
                                    }
                                    return (
                                        <Route
                                            key={index}
                                            path={route.path}
                                            element={
                                                <Layout>
                                                    <Page />
                                                </Layout>
                                            }
                                        />
                                    );
                                })}
                            </Route>
                            <Route exact path="/" element={<SupplierRouter />}>
                                {supplierRouters.map((route, index) => {
                                    const Page = route.component;
                                    let Layout = DefaultLayout;
                                    if (route.layout) {
                                        Layout = route.layout;
                                    } else if (route.layout === null) {
                                        Layout = Fragment;
                                    }
                                    return (
                                        <Route
                                            key={index}
                                            path={route.path}
                                            element={
                                                <Layout>
                                                    <Page />
                                                </Layout>
                                            }
                                        />
                                    );
                                })}
                            </Route>
                            <Route exact path="/" element={<AdminRouter />}>
                                {adminRouters.map((route, index) => {
                                    const Page = route.component;
                                    let Layout = DefaultLayout;
                                    if (route.layout) {
                                        Layout = route.layout;
                                    } else if (route.layout === null) {
                                        Layout = Fragment;
                                    }
                                    return (
                                        <Route
                                            key={index}
                                            path={route.path}
                                            element={
                                                <Layout>
                                                    <Page />
                                                </Layout>
                                            }
                                        />
                                    );
                                })}
                            </Route>
                        </Routes>
                    </div>
                </BrowserRouter>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};
