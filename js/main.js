var rotulos = [];

window.onload = function() {
    var fileInput = document.getElementById('fileInput');
    var fileDisplayArea = document.getElementById('fileDisplayArea');

    fileInput.addEventListener('change', function(e) {
        var file = fileInput.files[0];
        var textType = /vnd.ms-excel.*/;

        if (file.type.match(textType)) {
            var reader = new FileReader();
            reader.onload = function(e) {
                rotulos = reader.result.split('\n');
                rotulos = rotulos.filter(condicion);
                rotulos = rotulos.filter(condicion_cero);
                fileDisplayArea.innerText = reader.result;
            }
            reader.readAsText(file);
        } else {
            fileDisplayArea.innerText = "File not supported!"
        }
    });
}

function condicion(arreglo){
		console.log(arreglo[0]);
		return (arreglo[0] != ' ' || arreglo[0] != '0');
	}

function condicion_cero(arreglo){
		console.log(arreglo[0]);
		return arreglo[0] != '0';
	}

function demoTextAlign() {
	var pdf = new jsPDF('p', 'pt', 'A4');
	pdf.setFillColor(0,0,0);
	pdf.setFontSize(8);
	pdf.setFont('calibri');
	pdf.setFontStyle('bold');
	pdf.setFont

	var x_cord = [[535, 502, 503, 469],
				  [431, 398, 399, 366],
				  [331, 295, 297, 264],
				  [228, 194, 195, 163],
				  [127, 93, 94, 59]];

	var y_cord = [[40,173, 127, 259],
				  [312, 444, 397, 530],
				  [580, 714, 671, 804]];
    
    // console.log(rotulos[41]);

    // console.log(rotulos[41]);
    var line = 0;
	for(i = 0; i < rotulos.length - 1; i++) {
		var ports = rotulos[i].split(';');
		if (i == 0 ) {
			//DO NOTHING
		} else if (i % 15 == 5) {
			line++;
		} else if (i % 15 == 10) {
			line++;
		} else if (i % 15 == 0) {
			line = 0;
			pdf.addPage();
		}
		// console.log(ports);
		pdf.text(pdf.splitTextToSize(ports[0], 93), x_cord[i % 5][0], y_cord[line][0], 270);
		pdf.text(pdf.splitTextToSize(ports[0], 93), x_cord[i % 5][1], y_cord[line][1], 270);
		pdf.text(pdf.splitTextToSize(ports[1], 93), x_cord[i % 5][2], y_cord[line][2], 90);
		pdf.text(pdf.splitTextToSize(ports[1], 93), x_cord[i % 5][3], y_cord[line][3], 90);
	}	
	pdf.save('Test.pdf');
}
