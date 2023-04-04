
var size = 50;
var bogoSortingtries = 300;
let speedFactor = 10;
let heightFactor = 3;

// create array of random numbers
function createArray(n) {
    var arr = [];
    for (var i = 0; i < n; i++) {
        arr[i] = Math.floor(Math.random() * 100 + 1);
    }
    if (checkForBars()) {
        createBars(arr);
        return arr;
    } else {
        return;
    }
}

// check if array is sorted
async function isSorted(a) {
    var unordered = 0;
    for (var i = 1; i < a.length; i++) {
        if (a[i] < a[i - 1]) {
            unordered = unordered + 1;
        }
    }
    if (unordered == 0) {
        console.log(a, " is sorted");
        // change bars to green
        const bars = document.getElementsByClassName("bar");
        for (var i = 0; i < bars.length; i++) {
            bars[i].style.backgroundColor = "lightgreen";
            await sleep(speedFactor);
        }
        return true;
    } else {
        console.log("Unsorted, try again");
        return false;
    }
}

// create the bars on screen
function createBars(arr) {
    // create a new div element
    for (var i = 0; i < arr.length; i++) {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = arr[i] * heightFactor + "px";
        document.getElementById("a1").appendChild(bar);

    }
}

// check if there are bars on the screen
function checkForBars() {
    const bars = document.getElementsByClassName("bar");
    if (bars.length == 0) {
        return true;
    } else {
        while (bars.length > 0) bars[0].remove();
        return true;
    }
}

// slow down the algorithms for visual purposes
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// remove bars at end
function removeElementsByClass(className) {
    const elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

/*

Bubble sorting algorithm.

*/
function startBubble() {
    var arr = createArray(size);
    bubbleSort(arr);
}

async function bubbleSort(arr) {
    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                for (let k = 0; k < bars.length; k++) {
                    if (k !== j && k !== j + 1) {
                        bars[k].style.backgroundColor = "white";
                    }
                }
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                bars[j].style.height = arr[j] * heightFactor + "px";
                bars[j].style.backgroundColor = "green";
                bars[j + 1].style.height = arr[j + 1] * heightFactor + "px";
                bars[j + 1].style.backgroundColor = "green";
                await sleep(speedFactor * 2);
            }
        }
        await sleep(speedFactor);
    }
    if (isSorted(arr)) {
        console.log("Bubble sort completed")
    }
    await sleep(1000);
    const elements = document.getElementsByClassName("bar");

    while (elements.length > 0) elements[0].remove();
    location.reload();
    return arr;
}

/*

Bogo sorting algorithm.

*/
function startBogo() {
    var arr = createArray(size / 10);
    bogoSort(arr);
}

async function bogoSort(arr) {
    var flag = false;
    while (!flag) {
        for (var i = 0; i < bogoSortingtries; i++) {
            shuffle(arr);
            await sleep(speedFactor * 5);
            if (isSorted(arr) === true) {
                console.log("Array sorted by bogo sort in " + i + " tries");
                flag = true;

            }

        }
        flag = false;
    }
    console.log("Array coudlnt be sorted by bogo sort in " + bogoSortingtries + " tries");
    await sleep(1000);
    const elements = document.getElementsByClassName("bar");

    while (elements.length > 0) elements[0].remove();
    location.reload();
}

//swap function for bogo sort
async function swap(arr, xp, yp) {
    var temp = arr[xp];
    arr[xp] = arr[yp];
    arr[yp] = temp;
}

//set bar heights during bogo sort
function setBarHeights(a) {
    const bars = document.getElementsByClassName("bar");
    for (var i = 0; i < a.length; i++) {
        bars[i].style.height = a[i] * heightFactor + "px";
    }
}

// shuffle the array for bogo sort
async function shuffle(a) {
    const bars = document.getElementsByClassName("bar");
    var i = 0;
    var j = a.length;
    for (i = 0; i < a.length;) {
        var ind = Math.floor(Math.random() * a.length);
        setBarHeights(a);
        await sleep(speedFactor);
        swap(a, j - i - 1, ind);
        i++;

    }
    return a;
}

/*

Selection sort

*/
function startSelectionSort() {
    var arr = createArray(size);
    selectionSort(arr);
}

async function selectionSort(arr) {
    let bars = document.getElementsByClassName("bar");
    let n = arr.length;
    for (let i = 0; i < n; i++) {
        // Finding the smallest number in the subarray
        let min = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[min]) {
                for (let k = 0; k < bars.length; k++) {
                    if (k !== j && k !== j + 1) {
                        bars[k].style.backgroundColor = "white";
                    }
                }
                min = j;
            }
        }
        if (min != i) {
            // Swapping the elements
            bars[min].style.backgroundColor = "green";
            bars[i].style.backgroundColor = "green";
            let temp = arr[i];
            arr[i] = arr[min];
            arr[min] = temp;
            setBarHeights(arr);
            await sleep(speedFactor * 2);
        }
        for (let l = 0; l < bars.length; l++) {
            bars[l].style.backgroundColor = "white";
        }
        if (isSorted(arr)) {
            console.log("Selction sort completed")
        }
    }
    await sleep(1000);
    const elements = document.getElementsByClassName("bar");

    while (elements.length > 0) elements[0].remove();
    location.reload();
    return arr;
}