// Migrate from cookies to localStorage.
let cookies = document.cookie.split('; ').map((e) => e.split('='))
if (cookies.length > 0) {
    let theme = cookies.find((c) => c[0] === 'user_theme')
    if (theme !== undefined) {
        window.localStorage.setItem('theme', theme[1])
    }
}

// Switch out the theme if we are on this page.
if (location.pathname.endsWith('/switch-theme.html')) {
    window.localStorage.setItem('theme', (window.localStorage.getItem('theme') === 'dark') ? 'light' : 'dark')
    window.location.replace(document.referrer)
}

// Wait for the body to be loaded.
while (document.querySelector('body') === null) {}

// Get our relative path.
let path = document.querySelector('link').href
path = path.substring(0, path.indexOf('_static'))

// Inject the correct theme stylesheet.
let theme = document.createElement('link')
theme.rel = 'stylesheet'
theme.type = 'text/css'
theme.href = path + '_static/theme-' + window.localStorage.getItem('theme') + '.css'
document.querySelector('head').appendChild(theme)
