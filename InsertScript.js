function SaveData(url , json)
{
  var newString = url.replace(/[^A-Z0-9]+/ig, "_");
  console.log(newString);

 //chrome.storage.sync.set({url: json}, function() {
 //  console.log('Settings saved');
 //  LoadData(url);
 //});
}

function LoadData(url) {

  var newString = url.replace(/[^A-Z0-9]+/ig, "_");
  console.log(newString);
  
  //chrome.storage.sync.get(url, function(data) {
  //  if(typeof data.url !== "undefined")
  //  {
  //    console.log("s");
  //    console.log(data[url]);
  //  }
  //});
}


function AddNewAnchorClick(){
	let text = window.getSelection().toString();
	AddListItem(text, document.body.scrollTop);
}

function AnchorLickClick()
{
	//document.documentElement.scrollTop =  if firefox;
	let scrollPostion = this.getAttribute('data-postion');
	document.body.scrollTop = scrollPostion;
}

function DeleteAnchorItemClick(e)
{
  let deleteItem = e["srcElement"];
  let listItem = deleteItem.parentNode.parentNode;
  listItem.parentNode.removeChild(listItem);
}

function AddListItem(text = null, postion)
{
	let newListItem = document.createElement('li');
	newListItem.addEventListener('click', AnchorLickClick);
	newListItem.setAttribute('data-postion', postion)

  let newListItemDiv = document.createElement('div');
  newListItemDiv.innerHTML = '<div class="AnchorItem" contenteditable="true">' + (text != '' ? text : postion + 'px') + '</div>' ;
  
  let DeleteAnchorItem = document.createElement('div');
  DeleteAnchorItem.innerHTML = 'X' ;
  DeleteAnchorItem.className = 'DeleteAnchorItem';
  DeleteAnchorItem.title = 'Delete';
  DeleteAnchorItem.addEventListener("click", DeleteAnchorItemClick);

  newListItemDiv.appendChild(DeleteAnchorItem);

  newListItem.appendChild(newListItemDiv);
	anchorList.appendChild(newListItem);
  document.body.appendChild(anchorContainer);


  BuildJsonData();
}

function BuildJsonData()
{
  let jsonData = {};
  let url = window.location.href;
  jsonData['URL'] = url;
  jsonData['PageHight'] = 220;
  jsonData['Anchors'] = [];


  let items = anchorList.getElementsByTagName("li");
  for (let i = 0; i < items.length; ++i) {
    jsonAnchors = {};
    jsonAnchors['Text'] = items[i].querySelector('.AnchorItem').innerHTML;
    jsonAnchors['Postion'] = items[i].getAttribute('data-postion');
    jsonData['Anchors'].push(jsonAnchors);

  }

  console.log(jsonData);

  SaveData(url,jsonData);
}





function ShowHideAnimate() 
{
  let pos = anchorContainer.style.left == "" ? 0 : anchorContainer.style.left;
  pos = parseInt(pos, 10);
 
  let hide = (pos >= 0);
  let animation = setInterval(frame, 10);
  
  function frame() {
    if ((hide && pos <= -187) || (!hide && pos >= 0))
    {
    	anchorContainer.style.left = (hide ? -187 : 0) + 'px';
      anchorTabText.innerHTML = (hide ? "SHOW" : "HIDE")
    	clearInterval(animation);
    } else {
	   	hide ? pos -= 5 : pos += 5;
    	anchorContainer.style.left = pos + 'px'; 
    }
  }
}


let anchorContainer = document.createElement('div');
anchorContainer.id = 'anchorContainer';
document.body.appendChild(anchorContainer);



let anchorBox = document.createElement('div');
anchorBox.id = 'anchorBox';
anchorContainer.appendChild(anchorBox);

let anchorList = document.createElement('ul');
anchorList.id = 'anchorList';
anchorBox.appendChild(anchorList);


let addNewAnchor = document.createElement('div');
addNewAnchor.id = 'addNewAnchor';
addNewAnchor.innerHTML = '+ add new anchor';
addNewAnchor.addEventListener("mousedown", AddNewAnchorClick);
anchorBox.appendChild(addNewAnchor);


let anchorTab = document.createElement('div');
anchorTab.id = 'anchorTab';
anchorTab.innerHTML = '<img src="' + chrome.extension.getURL('images/Icon16.png') + '">' 
anchorTab.addEventListener("click", ShowHideAnimate);
anchorBox.appendChild(anchorTab);

let anchorTabText = document.createElement('div');
anchorTabText.id = 'anchorTabText';
anchorTabText.innerHTML = 'HIDE';
anchorTab.appendChild(anchorTabText);







