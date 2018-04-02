var pieChart = function(sketch) {

    this.percents = [25, 25, 50];

    this.pointRadius = 12;

    this.height = 2500;
    this.width = 1000;
    // ammount to stay away from the edges
    this.visPadding = 25;

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
        gender: "F",
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

    this.filtered = false;

    this.leftGroup = [];
    this.rightGroup = [];

    this.leftRow = 1;
    this.leftCol = 1;
    this.rightRow = 1;
    this.rightCol = 1;
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

    sketch.setup = function() {
        sketch.createCanvas(width, height);
        sketch.fetchData(assignJSON);
        //mergeSort(testSort, 0, testSort.length);
    };

    sketch.fetchData = (callback) => {
        //Here we will load the data and store it in
        //sketch.data
        var client = new XMLHttpRequest();
        client.open('get', 'data/bills.json');
        client.onreadystatechange = function() {
            if (client.readyState == 4 && client.status == "200") {
                callback(client.responseText);
            }
        }
        client.send(null);
    };

    /* Assigning to the this context because this could really be an inline function */
    this.assignJSON = function(response){
        data = JSON.parse(response);
        for(var i=0; i<data.length; i++){
            sketch.centralRandom(data[i]);
        }
    }

    /**
     * Assign a random x y near the center in a small square
     * @param {point} point a point object
     */
    sketch.centralRandom = function(point){
        var randX = Math.floor(Math.random() * (width/4+1));
        var randY = Math.floor(Math.random() * (height/4+1));
        var aPoint = {
            'loc' : [randX, randY],
            'point' : point,
        };  
        activePoints.push(aPoint)
    }

    sketch.draw = function() {
        sketch.background(70, 70, 70);        
        for(var i=0; i<activePoints.length; i++){
            p = activePoints[i];
            c = (p['point']['gender']==="male") ? sketch.color(3,169,244) : sketch.color(255,64,129);
            sketch.fill(c);
            sketch.ellipse(p['loc'][0], p['loc'][1], pointRadius, pointRadius);

        }
    };

    sketch.mouseClicked = function() {
        if(sketch.mouseX < 0 || sketch.mouseY < 0 ||
            sketch.mouseX > width || sketch.mouseY > height){
                sketch.resetLists();
                filtered = false;
                leftRow = 1;
                leftCol = 1;
                rightRow = 1;
                rightCol = 1;
        } else if (!filtered){
            sketch.filterData((x)=>{
                return x['point']['gender']==='male';
            })
            filtered = true;
        }
    }

    /**
     * 
     * @param {function} filter A boolean filter function
     */
    sketch.filterData = function(filter) {
        for(var i=0; i<activePoints.length; i++){
            if(filter(activePoints[i])){
                leftGroup.push(activePoints[i]);
            }else{
                rightGroup.push(activePoints[i]);
            }
        }
        sketch.postFilterMove(22);
    };

    /**
     * 
     * @param {Integer} maxCol the max number of columns in a filtered view
     */
    sketch.postFilterMove = function(maxCol){

        for(var i=0; i<leftGroup.length; i++){
            leftGroup[i]['loc'] = [20*leftCol + visPadding, 20*leftRow];
            leftCol++;
            if(leftCol>maxCol){
                leftCol=1;
                leftRow++;
            }
        }
        for(var i=0; i<rightGroup.length; i++){
            //rightGroup[i]['loc'] = [length-(20*rightCol), width-(20*rightRow)];
            rightGroup[i]['loc'] = [(width - 20*rightCol) - visPadding, 20*rightRow];
            rightCol++;
            if(rightCol>maxCol){
                rightCol=1;
                rightRow++;
            }
        }
    }

    sketch.resetLists = function (){
        for(var i=0; i<activePoints.length; i++){
            var randX = Math.floor(Math.random() * (width+1));
            var randY = Math.floor(Math.random() * (height+1));
            activePoints[i]['loc'] = [randX, randY];
        }
        leftGroup = 1;
        leftCol = 1;
        rightGroup = 1;
        rightCol = 1;
        leftGroup = [];
        rightGroup = [];
    }

};

var renderPieChart = new p5(pieChart, 'pie-chart');
