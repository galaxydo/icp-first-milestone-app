document.body.addEventListener('htmx:sendError', (event) => {
  // TODO: add translations
  alert(`Network error when calling ${event.detail.requestConfig.path}`);
});

// https://htmx.org/events/#htmx:responseError
document.body.addEventListener('htmx:responseError', (event) => {
  // TODO: add translations
  alert(`Error ${event.detail.xhr.status} when calling ${event.detail.requestConfig.path}`);
});

document.body.addEventListener('htmx:afterRequest', function (evt) {
    const errorTarget = document.getElementById("htmx-alert")
    if (evt.detail.successful) {
        // Successful request, clear out alert
        // errorTarget.setAttribute("hidden", "true")
        // errorTarget.innerText = "";
    } else if (evt.detail.failed && evt.detail.xhr) {
        // Server error with response contents, equivalent to htmx:responseError
        console.warn("Server error", evt.detail)
        const xhr = evt.detail.xhr;
        errorTarget.innerText = `Unexpected server error: ${xhr.status} - ${xhr.statusText}`;
        errorTarget.removeAttribute("hidden");
    } else {
        // Unspecified failure, usually caused by network error
        console.error("Unexpected htmx error", evt.detail)
        errorTarget.innerText = "Unexpected error, check your connection and try to refresh the page.";
        errorTarget.removeAttribute("hidden");
    }
});

