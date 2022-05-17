const input = document.querySelector("input")
const defaultText = document.getElementById("default")
const debounceText = document.getElementById("debounce")
const throttleText = document.getElementById("throttle")


// ***************** Throttle// ***************** Throttle// ***************** Throttle
// window resize, scrolling, mouse move

const updateThrottleText = throttle((text) => {
  throttleText.textContent = text;
})

function throttle(cb, delay = 1000) {
  let shouldWait = false;
  let waitingArgs;
  const timeoutFunc = () => {
    if(waitingArgs == null) {
      shouldWait = false
    } else { // call if new args appear while waiting
      cb(...waitingArgs)
      waitingArgs = null;
      setTimeout(timeoutFunc, delay)
    }
  }

  return (...args) => {
    if(shouldWait) { // need to keep args between fn is being called, while shouldWait is working
      waitingArgs = args;
      return;
    }
    cb(...args);
    shouldWait = true;

    setTimeout(timeoutFunc, delay)
  }
}

// ***************** Debounce// ***************** Debounce// ***************** Debounce
// autocomplite
function debounce(cb, delay = 1000) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      cb(...args)
    }, delay)
  }
}

const updateDebounceText = debounce((text) => {
  debounceText.textContent = text;
})
//}, 250)


// *************************************
// *************************************
// *************************************
input.addEventListener("input", e => {
  defaultText.textContent = e.target.value;
  updateDebounceText(e.target.value);
  updateThrottleText(e.target.value);
})



