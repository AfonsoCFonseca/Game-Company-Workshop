class Backup {
  constructor( state ) {
   	this.firstBackup = state 
   	this.backup = {
   		third: null,
   		second: null,
   		first: null,
   	}
   	this.addBackUp( state )
   	this.backLength = 3
  }

  getLastBackup(){
  	console.log( this.backup )
  	this.downloadBackup( this.backup["first"] )

  }

  addBackUp( state ){
  	var third = this.backup.second 
  	this.backup.third = third

  	var second = this.backup.first
  	this.backup.second = second

  	var first = state
  	this.backup.first = first
  }

  logBackupSpecific( pos ){
  	return this.backup[ pos ] 
  }

  logBackup(){
  	return this.backup
  }

  downloadBackup( json ){
  	console.log( json )
  	var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json));
	var dlAnchorElem = document.getElementById('downloadAnchorElem');
	dlAnchorElem.setAttribute("href",     dataStr     );
	dlAnchorElem.setAttribute("download", "scene.json");
	dlAnchorElem.click();
  }

}