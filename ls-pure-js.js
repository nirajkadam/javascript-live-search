

window.onload = function ()
{
	var textData, dropdown, count, liData, index;
	var linkindex = -1;

	textData = document.getElementById("search");
	dropdown = document.getElementById('auto-complete');
	loader = document.getElementById('loader');

	textData.focus();

	window.onclick = function()
	{
		textData.focus();
	}
	
	document.getElementById("loader").style.display = 'none';
	dropdown.classList.add("hidden");

	textData.onkeyup = function(key)
	{
		var ask, objdata;
		var output = '';

		if(textData.value == "")
		{
			dropdown.classList.remove("show");
			dropdown.classList.add("hidden");
		}
		else
		{
			dropdown.classList.remove("hidden");
			dropdown.classList.add("show");
		}

		if(window.XMLHttpRequest)
		{
			ask = new XMLHttpRequest();
		}
		else
		{
			ask = new ActiveXObject("Microsoft.XMLHTTP");
		}
		
		ask.open('GET','http://www.omdbapi.com/?s='+textData.value+'&apikey=df54f5e1',true);
		// ask.open('GET','http://www.omdbapi.com/?apikey=3259fac4&s='+textData.value,true);

		if(textData.value.length>1)
		{
			ask.onreadystatechange = function()
			{
				if((ask.readyState === 4) && (ask.status === 200))
				{
					dropdown.classList.remove("hidden");
					dropdown.classList.add("show");
					
					loader.classList.remove('show');

					objdata = JSON.parse(ask.responseText);
					
					if(objdata.Response=='False')
					{
						update.classList.remove('light');
						output += '<li><h3>No such Movie</h3></li>';
						output += '</ul>';

//						console.log(output); 

						dropdown.classList.remove("show");
						dropdown.classList.add("hidden");

						update.classList.remove("hidden");
						update.classList.add("show");
					}
					else
					{
						dropdown.innerHTML = "";
						count = 0;

						update.classList.remove("hidden");
						update.classList.add("show");

						// Sorting 'objdata' JS-Object
						
						objdata.Search.sort(function(a, b)
						{
							return a.Year - b.Year;
						});

						for(var i = 0; i < objdata.Search.length; i++)
						{
							update.classList.remove('light');

								// * Escape Character Alternative *
								output += '<li id='+objdata.Search[i].imdbID+'><a href="#"  style="text-decoration:none;">';
								output += '<h2>'+objdata.Search[i].Title+'</h2>';
								output += '<p> <b> Year</b> : '+objdata.Search[i].Year+' <b>imdbID</b> : '+objdata.Search[i].imdbID+' <b>Type</b> : '+objdata.Search[i].Type+'</p>';
								output += '</a></li>';

								aTag = document.createElement('a');
								aTag.setAttribute('href',"#");
								aTag.setAttribute('id',objdata.Search[i].imdbID);								

								aTag.onclick = function(e)
								{
									getMovieDetails(e.target.getAttribute("id"));
								}

								aTag.innerHTML = objdata.Search[i].Title;
								dropdown.appendChild(aTag);
						}
						count = dropdown.getElementsByTagName("a").length;

					}					
					output += "</ul>";

					if(document.getElementById("search").value != "")
					{
						document.getElementById("update").innerHTML = output;
					}

//-------------------- starts here -------------------------------------

							var ul = document.getElementById('links');

								for(var i=0;i<ul.childNodes.length;i++)
								{
									var idnum = ul.childNodes[i].getAttribute("id");

									if(idnum == null)
									{
									}
									else
									{
										ul.childNodes[i].onclick = function()
										{
											getMovieDetails(this.getAttribute("id"));
										}
									}
								}

//-------------------- ends here -------------------------------------

				}

			}


			if(key.keyCode == 37 || key.keyCode == 38 || key.keyCode == 39 || key.keyCode == 40 || key.keyCode == 13 || key.keyCode == 27)
			{

				// Handling Down Arrow Key Press
				if(key.keyCode == 40 && dropdown.getElementsByTagName("a").length != 0)
				{
					if(linkindex >= count-1)
					{
						dropdown.getElementsByTagName("a")[linkindex].classList.remove("selected");
						linkindex = 0;
						dropdown.getElementsByTagName("a")[linkindex].classList.add("selected");
					}
					else
					{
						if(linkindex == -1)
						{
							linkindex = linkindex + 1;
							dropdown.getElementsByTagName("a")[linkindex].classList.add("selected");
						}
						else
						{
							dropdown.getElementsByTagName("a")[linkindex].classList.remove("selected");
							dropdown.getElementsByTagName("a")[linkindex].nextSibling.classList.add("selected");
							linkindex = linkindex + 1;
						}
					}
					textData.value = dropdown.getElementsByTagName("a")[linkindex].innerHTML;
				}

				// Handling Up Arrow Key Press
				if(key.keyCode == 38 )
				{
					if(linkindex < 1)
					{
						if(linkindex == -1)
						{
							linkindex = count - 1;
							dropdown.getElementsByTagName("a")[linkindex].classList.add("selected");
						}
						dropdown.getElementsByTagName("a")[linkindex].classList.remove("selected");
						linkindex = count - 1;
						dropdown.getElementsByTagName("a")[linkindex].classList.add("selected");
					}
					else
					{
						dropdown.getElementsByTagName("a")[linkindex].classList.remove("selected");
						dropdown.getElementsByTagName("a")[linkindex].previousSibling.classList.add("selected");
						linkindex = linkindex - 1;
					}
					textData.value = dropdown.getElementsByTagName("a")[linkindex].innerHTML;
				}
				
				if(key.keyCode == 37)
				{
					console.log('yo')
				}

				if(key.keyCode == 39)
				{
				}

				// Handling Enter Key Press
				if(key.keyCode == 13)
				{
					dropdown.classList.remove("show");
					dropdown.classList.add("hidden");

//					getMovieDetails(dropdown.getElementsByTagName("a")[linkindex].getAttribute("id"));
				}

			}
			else
			{
				update.classList.remove("light");
				update.classList.add("light");

				ask.send();

				output += "<ul id='links'>";

				loader.classList.remove('hidden');
				loader.classList.add('show');

				linkindex = -1;
				dropdown.classList.remove("show");
				dropdown.classList.add("hidden");
			}
	}
	else
	{
		dropdown.classList.remove("show");
		dropdown.classList.add("hidden");
		output += "<ul>";
		output += '<li><h3>API starts searching after 2 characters</h3></li>';
		output += "</ul>";
	}

	if(textData.value == "")
	{
		document.getElementById("update").innerHTML = "";
		dropdown.classList.add("remove");
	}

	if(textData.value.length == 1)
	{
		document.getElementById("update").innerHTML = output;
		dropdown.classList.add("remove");
	}
}

	dropdown.onmouseover = function(curr)
	{
		console.log(curr);
		if(dropdown.getElementsByTagName("a")[linkindex])
		{
			dropdown.getElementsByTagName("a")[linkindex].classList.remove("selected");
		}


		textData.value = curr.target.innerText;
		linkindex = -1;
	}

function getMovieDetails(id)
{
	loader.classList.add("show");
	dropdown.classList.remove("show");
	dropdown.classList.add("hidden");
	
	var reqDetailsAjax;
	var resDetails;
	
	var movieDOM = '';

	if(window.XMLHttpRequest)
	{
		reqDetailsAjax = new XMLHttpRequest();
	}
	else
	{
		reqDetailsAjax = new ActiveXObject("Microsoft.XMLHTTP");
	}

	reqDetailsAjax.open('GET','http://www.omdbapi.com/?apikey=df54f5e1&i='+id,true);

	reqDetailsAjax.onreadystatechange = function()
	{
		if((reqDetailsAjax.readyState === 4) && (reqDetailsAjax.status === 200))
		{
			loader.classList.remove("show");

			resDetails = JSON.parse(reqDetailsAjax.responseText);

			movieDOM += '<br><br><h2>'+resDetails.Title+'</h2>';
			movieDOM += '<p> <b>Released On :</b> '+resDetails.Released+' <b>Year :</b> '+resDetails.Year+' <b>Duration :</b> '+resDetails.Runtime+' <b>imdbID :</b> '+resDetails.imdbID+'</p>';
			movieDOM += '<p> <b>Actors :</b> '+resDetails.Actors+' <b>Country :</b> '+resDetails.Country+'</p>';
			movieDOM += '<p> <b>Directions :</b> '+resDetails.Director+' <b>Genre :</b> '+resDetails.Genre+' <b>Language :</b> '+resDetails.Language+'</p>';
			
			if(resDetails.Poster=='N/A')
			{
				movieDOM += '<h4>Image Not Available</h4>';
			}
			else
			{
				movieDOM += '<img src='+resDetails.Poster+' alt="Movie Image" height="200" width="150">';
			}
			document.getElementById("update").innerHTML = movieDOM;
		}
	}
	reqDetailsAjax.send();
}
}