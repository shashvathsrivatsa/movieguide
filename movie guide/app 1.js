// old

function loadSearch () {
    localStorage.setItem('searchQuery', document.getElementById('search-bar').value);
    getSearchResults()
}

function getSearchResults () {
    const query = localStorage.getItem('searchQuery');

    fetch('http://www.omdbapi.com/?apikey=686abe54&s=' + query)
    .then(response => response.json())
    .then(response => {
        console.log(response);
        
        document.getElementById('result1-img').src = response.Search[0].Poster;
        document.getElementById('result1-title').innerHTML = response.Search[0].Title;
        document.getElementById('result1-year').innerHTML = response.Search[0].Year;
        var type = response.Search[0].Type
        document.getElementById('result1-type').innerHTML = type.charAt(0).toUpperCase() + type.slice(1);
        
        document.getElementById('result2-img').src = response.Search[1].Poster;
        document.getElementById('result2-title').innerHTML = response.Search[1].Title;
        document.getElementById('result2-year').innerHTML = response.Search[1].Year;
        var type = response.Search[1].Type
        document.getElementById('result2-type').innerHTML = type.charAt(0).toUpperCase() + type.slice(1);
        
        document.getElementById('result3-img').src = response.Search[2].Poster;
        document.getElementById('result3-title').innerHTML = response.Search[2].Title;
        document.getElementById('result3-year').innerHTML = response.Search[2].Year;
        var type = response.Search[2].Type
        document.getElementById('result3-type').innerHTML = type.charAt(0).toUpperCase() + type.slice(1);
        
        document.getElementById('result4-img').src = response.Search[3].Poster;
        document.getElementById('result4-title').innerHTML = response.Search[3].Title;
        document.getElementById('result4-year').innerHTML = response.Search[3].Year;
        var type = response.Search[3].Type
        document.getElementById('result4-type').innerHTML = type.charAt(0).toUpperCase() + type.slice(1);
        
        document.getElementById('result5-img').src = response.Search[4].Poster;
        document.getElementById('result5-title').innerHTML = response.Search[4].Title;
        document.getElementById('result5-year').innerHTML = response.Search[4].Year;
        var type = response.Search[4].Type
        document.getElementById('result5-type').innerHTML = type.charAt(0).toUpperCase() + type.slice(1);

        localStorage.setItem('resultsIDs', [response.Search[0].Title, response.Search[1].Title, response.Search[2].Title, response.Search[3].Title, response.Search[4].Title]);
    })

    // fetch('https://api.themoviedb.org/3/search/movie?api_key=c4af9fa1b544f4c1176b81cd09f45ac0&query=' + query)
    // .then(response => response.json())
    // .then(response => {
    //     console.log(response);
        
    //     document.getElementById('result1-img').src = 'https://image.tmdb.org/t/p/w500' + response.results[0].poster_path;
    //     document.getElementById('result2-img').src = 'https://image.tmdb.org/t/p/w500' + response.results[1].poster_path;
    //     document.getElementById('result3-img').src = 'https://image.tmdb.org/t/p/w500' + response.results[2].poster_path;
    //     document.getElementById('result4-img').src = 'https://image.tmdb.org/t/p/w500' + response.results[3].poster_path;
    //     document.getElementById('result5-img').src = 'https://image.tmdb.org/t/p/w500' + response.results[4].poster_path;
    // })
}

function productPage(resultIndex) {
    const resultsIDs = localStorage.getItem('resultsIDs').split(',')
    localStorage.setItem('title', resultsIDs[resultIndex]);
    window.location.href = "product-page.html";
}

function infoData1 () {

    const title = localStorage.getItem('title');

    fetch('https://api.themoviedb.org/3/search/tv?api_key=c4af9fa1b544f4c1176b81cd09f45ac0&query=' + title)
    .then(response => response.json())
    .then(response => {
        const tmdbID = response.results[0].id;

        fetch(`https://api.themoviedb.org/3/tv/${tmdbID}/watch/providers?api_key=c4af9fa1b544f4c1176b81cd09f45ac0`)
        .then(response2 => response2.json())
        .then(response2 => {
            let flatrate;
            if ('US' in response2.results) {
                flatrate = response2.results.US.flatrate;
            } else {
                const results = response2.results
                flatrate = results[Object.keys(results)[0]].flatrate;
            }

            const providers = [];
            flatrate.forEach(item => {
            providers.push(item.provider_name);
            });

            document.getElementById('streaming').innerHTML = providers.join(', ');
        });
    });

    fetch('http://www.omdbapi.com/?apikey=686abe54&t=' + title)
    .then(response => response.json())
    .then(response => {
        console.log(response);
        
        document.querySelector('.info-container-1').style.display = "flex";
        document.querySelector('.info-container-2').style.display = "none";
        document.querySelector('.info-container-3').style.display = "none";
        document.querySelector('.info-container-4').style.display = "none";
        document.getElementById('dot-1').style.backgroundColor = "#fff";
        document.getElementById('dot-2').style.backgroundColor = "#949494";
        document.getElementById('dot-3').style.backgroundColor = "#949494";
        document.getElementById('dot-4').style.backgroundColor = "#949494";
        
        setTimeout(function() {
            document.querySelector('.status-bar-container').style.display = "none";
            document.querySelector('.product-container').style.display = "flex";
            document.querySelector('.graph-container').style.display = "block";
        }, 750);   // streaming services takes longer to load

        // document.getElementById('poster').src = response.Poster;
        
        const plot = response.Plot;
        if (plot != 'N/A') {
            document.getElementById('plot').innerHTML = plot;
        }
        
        document.getElementById('title').innerHTML = response.Title;
        document.getElementById('year').innerHTML = response.Year;
        document.getElementById('director').innerHTML = response.Director;
        document.getElementById('genre').innerHTML = response.Genre;
        
        document.getElementById('ratings-imdb').innerHTML = response.Ratings[0].Value;

        if (response.Ratings.length == 1) {
            document.getElementById('ratings-rt').innerHTML = 'N/A';
            document.getElementById('ratings-mc').innerHTML = 'N/A';
        } else if (response.Ratings.length == 2) {
            document.getElementById('ratings-rt').innerHTML = response.Ratings[1].Value;
            document.getElementById('ratings-mc').innerHTML = 'N/A';
        } else {
            document.getElementById('ratings-rt').innerHTML = response.Ratings[1].Value;
            document.getElementById('ratings-mc').innerHTML = response.Ratings[2].Value;
        }

        type = response.Type
        let url;
        if (type == 'movie') {
            url = 'https://api.themoviedb.org/3/search/movie?api_key=c4af9fa1b544f4c1176b81cd09f45ac0&query=' + title
        } else {
            url = 'https://api.themoviedb.org/3/search/tv?api_key=c4af9fa1b544f4c1176b81cd09f45ac0&query=' + title
        }
        fetch(url)
        .then(response => response.json())
        .then(response => {
            console.log(response.results[0]);
            
            posterPath = response.results[0].poster_path
            document.getElementById('poster').src = 'https://image.tmdb.org/t/p/w500' + posterPath;
        })

    })
    
}

function infoData2 () {    
    const title = localStorage.getItem('title');
    
    fetch('http://www.omdbapi.com/?apikey=686abe54&t=' + title)
    .then(response => response.json())
    .then(response => {
        console.log(response);
        
        document.querySelector('.info-container-1').style.display = "none";
        document.querySelector('.info-container-2').style.display = "flex";
        document.querySelector('.info-container-3').style.display = "none";
        document.querySelector('.info-container-4').style.display = "none";
        document.getElementById('dot-1').style.backgroundColor = "#949494";
        document.getElementById('dot-2').style.backgroundColor = "#fff";
        document.getElementById('dot-3').style.backgroundColor = "#949494";
        document.getElementById('dot-4').style.backgroundColor = "#949494";

        document.getElementById('rated').innerHTML = response.Rated;
        document.getElementById('runtime').innerHTML = response.Runtime;
        document.getElementById('released').innerHTML = response.Released;
        document.getElementById('awards').innerHTML = response.Awards;
        document.getElementById('language').innerHTML = response.Language;
        document.getElementById('writer').innerHTML = response.Writer;
        document.getElementById('country').innerHTML = response.Country;
        
        if ('BoxOffice' in response) {
            document.getElementById('misc').innerHTML = response.BoxOffice;
        } else {
            document.getElementById('misc').innerHTML = response.totalSeasons;
            document.getElementById('misc title').innerHTML = 'Seasons: ';
        }
    })
}

function infoData3 () {    
    const title = localStorage.getItem('title');
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4d6ef65f19msh9b74fcc7b3ad345p1f9d78jsn4371557c7a02',
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
    };

    fetch('https://streaming-availability.p.rapidapi.com/v2/search/title?country=us&show_type=movie&output_language=en&title=' + title, options)
    .then(response => response.json())
    .then(response => {
        console.log(response);
        
        document.querySelector('.info-container-1').style.display = "none";
        document.querySelector('.info-container-2').style.display = "none";
        document.querySelector('.info-container-3').style.display = "flex";
        document.querySelector('.info-container-4').style.display = "none";
        document.getElementById('dot-1').style.backgroundColor = "#949494";
        document.getElementById('dot-2').style.backgroundColor = "#949494";
        document.getElementById('dot-3').style.backgroundColor = "#fff";
        document.getElementById('dot-4').style.backgroundColor = "#949494";

        document.getElementById('netflix').innerHTML = 'sup';

    })
}

function infoData4 () {    
    const title = localStorage.getItem('title');
    
    fetch('https://api.themoviedb.org/3/tv/1396/images?api_key=c4af9fa1b544f4c1176b81cd09f45ac0&query=' + title)
    // fetch('http://www.omdbapi.com/?apikey=686abe54&plot=full&t=' + title)
    .then(response => response.json())
    .then(response => {
        console.log(response);
        
        document.querySelector('.info-container-1').style.display = "none";
        document.querySelector('.info-container-2').style.display = "none";
        document.querySelector('.info-container-3').style.display = "none";
        document.querySelector('.info-container-4').style.display = "flex";
        document.getElementById('dot-1').style.backgroundColor = "#949494";
        document.getElementById('dot-2').style.backgroundColor = "#949494";
        document.getElementById('dot-3').style.backgroundColor = "#949494";
        document.getElementById('dot-4').style.backgroundColor = "#fff";
        
        // document.getElementById('summary').innerHTML = response.Plot;
    })
}

function grapher () {
    const title = localStorage.getItem('title');

    fetch('https://api.themoviedb.org/3/search/tv?api_key=c4af9fa1b544f4c1176b81cd09f45ac0&query=' + title)
    .then(response => response.json())
    .then(response => {
        const tmdbID = response.results[0].id
        
        fetch('https://api.themoviedb.org/3/tv/' + tmdbID + '?api_key=c4af9fa1b544f4c1176b81cd09f45ac0')
        .then(response2 => response2.json())
        .then(response2 => {
            const seasons = response2.number_of_seasons
            var votesX = []
            var votesY = []
            
            for (let i = 1; i < seasons+1; i++) {
                fetch('https://api.themoviedb.org/3/tv/' + tmdbID + '/season/' + i + '?api_key=c4af9fa1b544f4c1176b81cd09f45ac0')
                .then(response3 => response3.json())
                .then(response3 => {
                    let episodes = response3.episodes
                    episodes.forEach(item => {
                        if (item.vote_count != 0) {
                            let key = 'S' + i + ' E' + item.episode_number
                            votesX.push(key)
                            let value = item.vote_average
                            votesY.push(value)
                        }
                    })
                })
                .then(() => {
                    if (i === seasons) {                        
                        canvas = document.getElementById('canvas');

                        let data = [{
                            x: votesX,
                            y: votesY,
                            line: {
                                color: '#FC121A'
                            },
                            fill: 'tonexty',
                            fillcolor: {
                                type: 'linear',
                                colorstops: [
                                [0, '#0066cc'],
                                [1, '#ffffff']
                                ]
                            }
                        }]

                        var layout = {
                            font: {
                                color: '#fff',
                                family: 'Avenir'
                            },
                            title: 'Episode Ratings',
                            plot_bgcolor: 'rgba(0, 0, 0, 0)',
                            paper_bgcolor: 'rgba(0, 0, 0, 0)',
                            xaxis: {
                                title: {
                                    text: 'Episode',
                                    standoff: 35
                                },
                                color: '#ccc',
                                showgrid: false,
                                showline: true,
                                zeroline: true
                            },
                            yaxis: {
                                title: 'Rating',
                                color: '#ccc',
                                showgrid: false,
                                showline: true
                            },
                        };

                        Plotly.newPlot(canvas, data, layout, {displayModeBar: false});
                        // Plotly.newPlot(canvas, data, {margin: { t: 0 }} );
                    }
                })
            }
            
        })
    })

}

// home page featured slideshow
function updateSlideshow (s) {
    fetch('https://api.themoviedb.org/3/trending/all/week?api_key=c4af9fa1b544f4c1176b81cd09f45ac0')
    .then(response => response.json())
    .then(response => {
        document.getElementById('slideshow-img').src = 'https://image.tmdb.org/t/p/original' + response.results[s].backdrop_path + '?h=1080';
        document.getElementById('h-title').innerHTML = response.results[s].title;
        document.getElementById('h-year').innerHTML = response.results[s].release_date.substring(0, 4);
        document.getElementById('h-rating').innerHTML = Math.round(response.results[s].vote_average * 10) / 10;
        document.getElementById('h-plot').innerHTML = response.results[s].overview;

        const tmdbID = response.results[s].id;
        const type = response.results[1].media_type;
        fetch('https://api.themoviedb.org/3/' + type + '/' + tmdbID + '?api_key=c4af9fa1b544f4c1176b81cd09f45ac0&language=en-US')
        .then(response2 => response2.json())
        .then(response2 => {
            let runtime = response2.runtime;
            document.getElementById('h-seasons-runtime').innerHTML = Math.floor(runtime/60) + 'h ' + runtime%60 + 'm';

            let genres = response2.genres;
            let genresNames = [];
            genres.forEach(item => {
                genresNames.push(item.name);
            })
            document.getElementById('h-genre').innerHTML = genresNames.join(', ');
            
            const imdbID = response2.imdb_id;
            fetch('http://www.omdbapi.com/?apikey=686abe54&i=' + imdbID)
            .then(response3 => response3.json())
            .then(response3 => {
                document.getElementById('h-cast').innerHTML = response3.Actors;
                document.getElementById('h-rated').innerHTML = response3.Rated;
            })
        });

    });
}

var slide = 0;
updateSlideshow(slide);

// home load
function homeLoad() {
    setTimeout(() => {
        document.querySelector('.home-container').style.display = "flex";
    }, 500);
}

function slideshowUpdate() {
    windowWidth = window.innerWidth;
    slideshowHeight = windowWidth * 0.7 / (192/108) - 35.5
    document.querySelector('.slideshow-container').style.height = slideshowHeight + "px"
    document.querySelector('.fade-container').style.height = slideshowHeight + 20 + "px"
}

function changeSlideshow(increment) {
    if (slide + increment > 10) {
        slide = 0;
    } else if (slide + increment < 0) {
        slide = 10;
    } else {
        slide += increment;
    }
    updateSlideshow(slide);
}

fetch('https://api.themoviedb.org/3/trending/all/week?api_key=c4af9fa1b544f4c1176b81cd09f45ac0')
.then(response => response.json())
.then(response => {
    console.log(response);
    document.getElementById('trending-1').querySelector('img').src = 'https://image.tmdb.org/t/p/original' + response.results[0].poster_path + '?h=200'
    document.getElementById('trending-2').querySelector('img').src = 'https://image.tmdb.org/t/p/original' + response.results[1].poster_path + '?h=200'
    document.getElementById('trending-3').querySelector('img').src = 'https://image.tmdb.org/t/p/original' + response.results[2].poster_path + '?h=200'
    document.getElementById('trending-4').querySelector('img').src = 'https://image.tmdb.org/t/p/original' + response.results[3].poster_path + '?h=200'
    document.getElementById('trending-5').querySelector('img').src = 'https://image.tmdb.org/t/p/original' + response.results[4].poster_path + '?h=200'
    document.getElementById('trending-6').querySelector('img').src = 'https://image.tmdb.org/t/p/original' + response.results[5].poster_path + '?h=200'
    document.getElementById('trending-7').querySelector('img').src = 'https://image.tmdb.org/t/p/original' + response.results[6].poster_path + '?h=200'
    document.getElementById('trending-8').querySelector('img').src = 'https://image.tmdb.org/t/p/original' + response.results[7].poster_path + '?h=200'
    document.getElementById('trending-9').querySelector('img').src = 'https://image.tmdb.org/t/p/original' + response.results[8].poster_path + '?h=200'
    document.getElementById('trending-10').querySelector('img').src = 'https://image.tmdb.org/t/p/original' + response.results[9].poster_path + '?h=200'
    document.getElementById('trending-11').querySelector('img').src = 'https://image.tmdb.org/t/p/original' + response.results[10].poster_path + '?h=200'
    document.getElementById('trending-12').querySelector('img').src = 'https://image.tmdb.org/t/p/original' + response.results[11].poster_path + '?h=200'
    document.getElementById('trending-13').querySelector('img').src = 'https://image.tmdb.org/t/p/original' + response.results[12].poster_path + '?h=200'
    document.getElementById('trending-14').querySelector('img').src = 'https://image.tmdb.org/t/p/original' + response.results[13].poster_path + '?h=200'
})

function trendingArrows (displayMode) {
    document.querySelector('.trending-right-arrow-circle').style.display = displayMode;
}

function clearSearch () {
    document.getElementById('search-bar').value = '';
}



// hide status bar (link information at the bottom left on hover)
var aTags = document.querySelectorAll('span[data-href]');

for(var i = 0; i < aTags.length; i++){
    var aTag = aTags[i];
    aTag.addEventListener('click', function(e){
        var ele = e.target;
        window.location.replace(ele.getAttribute('data-href'));
    });    
}
