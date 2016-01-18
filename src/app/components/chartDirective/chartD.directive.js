(function() {
  'use strict';

  angular
    .module('fabware')
    .directive('chart', chart);

  /** @ngInject */
  function chart() {
    var directive = {
      restrict: 'AE',
      templateUrl: 'app/components/chartDirective/chartD.html',
      scope: {
        list: '='
      },
      link: postLink
    };

    /** @ngInject */
    function postLink(scope) {
      var colors = ['#468966','#FFF0A5','#9258E4','#FFB03B','#B64926','#8E2800', '#6999D0'];
      var first = scope.list[0].year;
      var last = scope.list[0].year;
      for(var i=0; i<scope.list.length; i++) {
        if(first > scope.list[i].year) {
          first = scope.list[i].year;
        }
        if(last < scope.list[i].year) {
          last = scope.list[i].year;
        }
      }
      var firstTh = Math.floor((first - 1900)/10);
      var lastTh = Math.floor((last - 1900)/10);
      var arrYear = [];
      for (i=firstTh; i<=lastTh; i++){
        arrYear.push(0);
      }
      for(i=0; i<scope.list.length; i++) {
        arrYear[Math.floor((scope.list[i].year - 1900)/10)-firstTh]++;
      }

      function diagramm() {
        var svg = window.Snap('#chart');
        var circle = svg.circle(300, 300, 300, 300).attr({
          fill: '#000'
        });

        function drawPie(){
          var startAngle = 0;
          var endAngle = 0;
          var endAngletext = 0;
          var x1 = 0;
          var x2 = 0;
          var y1 = 0;
          var y2 = 0;
          var x2text = 0;
          var y2text = 0;
          var startX;
          var startY;
          var sector;
          var text;
          var baseX = 300;
          var baseY = 300;

          for(var i=0, l = arrYear.length; i<l; i++){
            startAngle = endAngle;
            endAngle = startAngle + arrYear[i]*18;
            endAngletext = startAngle + arrYear[i]/2*18;

            x1 = parseInt(baseX + 300*Math.cos(Math.PI*startAngle/180));
            y1 = parseInt(baseY + 300*Math.sin(Math.PI*startAngle/180));

            x2 = parseInt(baseX + 300*Math.cos(Math.PI*endAngle/180));
            y2 = parseInt(baseY + 300*Math.sin(Math.PI*endAngle/180));

            x2text = parseInt(baseX + 200*Math.cos(Math.PI*endAngletext/180));
            y2text = parseInt(baseY + 200*Math.sin(Math.PI*endAngletext/180));

            if ( i == 0 ) {
              startX = x1; startY = y1;
            } else if ( i == l-1 ) {
              x2 = startX; y2 = startY;
            }

            var pathStr = 'M'+ baseX +','+ baseY +'  L' + x1 + ',' + y1 + '  A'+ 300 +','+ 300 +' 0 0,1 ' + x2 + ',' + y2 + ' z';

            sector = svg.path( pathStr );
            sector
              .attr('fill',colors[i]);

            if(i+firstTh <10) {
              text = svg.text(x2text,y2text,(i+firstTh)*10 + 'th')
                .attr({
                  textAnchor:'middle',
                  fill: '#FFF',
                  'font-size': '18px'
                });
            } else {
              text = svg.text(x2text,y2text,(i+firstTh)*10 + 1900 + 'th')
                .attr({
                  textAnchor:'middle',
                  fill: '#FFF',
                  'font-size': '18px'
                });
            }
          }
        }
        drawPie();
      }
      diagramm();
    }

    return directive;
  }

})();
