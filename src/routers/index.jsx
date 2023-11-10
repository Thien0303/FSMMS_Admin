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
export const publicRouters = [
    {
        path: "/",
        name: "login",
        component: Login,
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
        path: "/post",
        name: "post",
        component: SinglePost,
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

];
export const supplierRouters = [

];
export const adminRouters = [

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
