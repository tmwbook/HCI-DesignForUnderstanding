var pieChart = function(sketch) {

    this.percents = [25, 25, 50];

    this.pointRadius = 12;

    this.height = 500;
    this.width = 500;

    /*
        Data is a {} translation of a data point
    */
   this.data = [{
        name: "Tom",
        gender: "M",
        age: 20,
        gdp: 500000000
    },{
        name: "Tom",
        gender: "M",
        age: 20,
        gdp: 500000000
    }]

    /*
        activePoints stores {data, [x,y]}
    */
    this.activePoints = [{'point':data[0], 'loc': [height/2, width/2]},
    {'point':data[1], 'loc': [height/2 + 20, width/2 + 20]}]

    this.testSort = [3, 5, 7, 2, 1, 9, 8]
    this.aux = []

    this.leftGroup = []
    this.rightGroup = []
/*
    this.merge = function(arr, low, mid, high) {
        var left = low;
        var right = mid+1;

        for(var i=low; i <= high; i++){
            aux[i] = arr[i];
        }
        
        for(var i=low; i <=high; i++){
            if(left > mid){
                arr[i] = aux[right++];
            }else if(right > high){
                arr[i] = aux[left++];
            }else if(aux[right] < aux[left]){
                arr[i] = aux[right++];
            }else{
                arr[i] = aux[left++];
            }
        }
    }
*/
    /* Sort data by GDP */
    /*
    this.mergeSort = function(arr, low, high) {
        if (arr.length === 1){
            return;
        }
        
        var mid = (low + high)/2;
        mergeSort(low, mid);
        mergeSort(mid+1, high);
        merge(arry, low, mid, high);
        console.log(testSort);
    } 
*/

    sketch.setup = () => {
        sketch.createCanvas(height, width);
        sketch.background(70, 70, 70);
        sketch.noStroke();
        //mergeSort(testSort, 0, testSort.length);
    };

    sketch.fetchData = () => {
        //Here we will load the data and store it in
        //sketch.data
    };

    sketch.draw = () => {
        for(var i=0; i<activePoints.length; i++){
            p = activePoints[i];
            sketch.ellipse(p['loc'][0], p['loc'][1], pointRadius, pointRadius);
        }
    };

    sketch.filterData = () => {

    }

};

var renderPieChart = new p5(pieChart, 'pie-chart');
