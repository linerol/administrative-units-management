// docs for router https://github.com/thepassle/app-tools/blob/master/router/README.md

import { html } from 'lit';

if (!(globalThis as any).URLPattern) {
    await import("urlpattern-polyfill");
}

import { Router } from '@thepassle/app-tools/router.js';
import { lazy } from '@thepassle/app-tools/router/plugins/lazy.js';

// @ts-ignore
import { title } from '@thepassle/app-tools/router/plugins/title.js';

import './pages/app-home.js';

const baseURL: string = (import.meta as any).env.BASE_URL;

export const router = new Router({
    routes: [
        {
            path: resolveRouterPath(),
            title: 'Home',
            render: () => html`<app-home></app-home>`
        },
        {
            path: resolveRouterPath('about'),
            title: 'About',
            plugins: [
                lazy(() => import('./pages/app-about/app-about.js')),
            ],
            render: () => html`<app-about></app-about>`
        },

        // {
        //     path: resolveRouterPath('department-page/:departmentId'),
        //     title: 'department page',
        //     plugins: [
        //         lazy(() => import('./pages/department-page.js'))
        //     ],
        //     render: (params) => html`<department-page departmentId="${params.departmentId}"></department-page>`
        // },

        {
            path: resolveRouterPath('department-page'),
            title: 'department page',
            plugins: [
                lazy(() => import('./pages/department-page.js'))
            ],
            render: () => html`<department-page></department-page>`
        },

        {
            path: resolveRouterPath('commune-page'),
            title: 'commune page',
            plugins: [
                lazy(() => import('./pages/commune-page.js'))
            ],
            render: () => html`<commune-page></commune-page>`
        },

        {
            path: resolveRouterPath('district-page'),
            title: 'district page',
            plugins: [
                lazy(() => import('./pages/district-page.js'))
            ],
            render: () => html`<district-page></district-page>`
        }

    ]
});

// This function will resolve a path with whatever Base URL was passed to the vite build process.
// Use of this function throughout the starter is not required, but highly recommended, especially if you plan to use GitHub Pages to deploy.
// If no arg is passed to this function, it will return the base URL.

export function resolveRouterPath(unresolvedPath?: string) {
    var resolvedPath = baseURL;
    if (unresolvedPath) {
        resolvedPath = resolvedPath + unresolvedPath;
    }

    return resolvedPath;
}
