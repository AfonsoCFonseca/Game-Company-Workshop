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
        contador += parseInt( teamObj[x] )
    }
    return contador
}

function countSalary( teamObj, plus = 0 ){
    
    var developers = artists = designers = sfx = marketing = 0
    if( teamObj ){
        developers = teamObj.developers | 0 
        artists = teamObj.artists || 0
        designers = teamObj.designers || 0
        sfx = teamObj.sfx || 0
        marketing = teamObj.marketing || 0
    }

    var totalSalary = 0
    var developersSalary = 0
    var artistsSalary = 0
    var designersSalary = 0
    var sfxSalary = 0
    var marketingSalary = 0

    developersSalary = developers * ( 900 + plus )
    artistsSalary = artists * ( 800 + plus )
    designersSalary = developers * ( 800 + plus )
    sfxSalary = artists * ( 700 + plus )
    marketingSalary = developers * ( 750 + plus )

    return {
        total: developersSalary + artistsSalary + designersSalary + sfxSalary + marketingSalary,
        developersSalary,
        artistsSalary,
        designersSalary,
        sfxSalary,
        marketingSalary
    }

}

function objInsideChecker( actualState, name, value, replace = null ){

    if( actualState[ name ] ){
      
      if( typeof value === 'object' && replace == false){
           for( var x in value ){
              actualState[ name ][x] = value[x]
            }
      }
      else actualState[ name ] = value
    }
    else actualState[ name ] = value


    return actualState
}

function getOtherVisionFromArray( vision ){

    var notThis = null
    for( var i = 0; i < visionArrayYear1.length; i++ ){
        if( vision == visionArrayYear1[i] ) notThis = i
    }
    
    var newPos;
    do{
        newPos = getRandomInt(0,2)
    } while( notThis == newPos )

    return visionArrayYear1[newPos]

}