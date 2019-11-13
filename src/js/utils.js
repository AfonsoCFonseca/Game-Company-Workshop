function giveMinutesAndSeconds( seconds ){
    var dateObj = new Date( seconds * 1000);
    var hours = dateObj.getUTCHours();
    var minutes = dateObj.getUTCMinutes();
    var seconds = dateObj.getSeconds();

    return  minutes.toString().padStart(2, '0') + ':' + 
        seconds.toString().padStart(2, '0');
}

function giveMinutesSecondsAndHours( seconds ){
	var dateObj = new Date( seconds * 1000);
    var hours = dateObj.getUTCHours();
    var minutes = dateObj.getUTCMinutes();
    var seconds = dateObj.getSeconds();

    return hours.toString().padStart(2, '0') + ':' + 
        minutes.toString().padStart(2, '0') + ':' + 
        seconds.toString().padStart(2, '0');
}


function getRandomInt( min = 1, max ){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function countTeam( teamObj ){
    var contador = 0

    for( var x in teamObj ){
        contador += teamObj[x]
    }
    return contador
}

function countSalary( teamObj, plus = 0 ){
    
    var developers = teamObj.developers
    var artists = teamObj.artists || null

    var totalSalary = 0
    var developersSalary = 0
    var artistsSalary = 0

    developersSalary = developers * ( 900 + plus )
    artistsSalary = artists * ( 800 + plus )

        console.log( {
        total: developersSalary + artistsSalary,
        developersSalary,
        artistsSalary,
    })
    return {
        total: developersSalary + artistsSalary,
        developersSalary,
        artistsSalary,
    }

}

function objInsideChecker( actualState, name, value ){

    if( actualState[ name ] ){
      
      if( typeof value === 'object' ){
        for( var x in value ){
          actualState[ name ][x] = value[x]
        }
      }
      else actualState[ name ] = value
    }
    else actualState[ name ] = value


    return actualState
}