// Initialize Firebase

//Functions:
//updateSong(id, name, vid_id, vote)
//voteSong(id, vid_id)
//getBoxes(func)
//iter(dict)
//songData(id, func)


var config = {
  apiKey: "AIzaSyDWvWLXNZfMEkcqRlYGwIANyuNNy_2H_d8",
  authDomain: "music-box-28430.firebaseapp.com",
  databaseURL: "https://music-box-28430.firebaseio.com/",
  storageBucket: "gs://music-box-28430.appspot.com",
  // messagingSenderId: "<SENDER_ID>",
};
firebase.initializeApp(config);

var database = firebase.database();

var nameRef = firebase.database().ref('/jukebox/');
nameRef.on('value', function(snapshot) {
    var str = '';
    for (var key in snapshot.val()) {
        str += snapshot.val()[key]['song'];
    }
    // console.log(str);
  document.getElementById("head").innerHTML=str;
});


function updateSong(id, name, vid_id, vote) {
    database.ref('/jukebox/' + id +'/' + vid_id).set({
        name: name,
        vid_id: vid_id,
        vote: vote
    });

}

function fbchangeTitle(id, name, vid_id) {
    database.ref('/jukebox/' + id +'/' + vid_id + '/' + 'name').set(name);
}

// function updateName(id, vid)

function voteSong(id, vid_id) {
    var ref = database.ref('/jukebox/' + id +'/' + vid_id + '/vote');

    ref.transaction(function(vote) {
        return (vote || 0) + 1;
    });
}

function voteSongName(id, name) {
    var ref = database.ref('/jukebox/' + id +'/').orderByChild('name').equalTo(name);
    ref.once('value', function(snapshot) {
        ref = database.ref('/jukebox/' + id +'/' + Object.keys(snapshot.val())[0] + '/vote')

        ref.transaction(function(vote) {
            return (vote || 0) + 1;
        });
    });


}


// voteSong("box1", '5hxibHJOE5E')

function getBoxes(func) {
    var ref = database.ref('/locations');
    ref.on('value', function(snapshot) {
        // console.log(snapshot.val());
        func(snapshot.val());
    });
    console.log("running getBoxes()");
}

var text = 'iter'
function iter(dict) {
    console.log(text);
    for (var key in dict) {
        console.log(dict[key]['name']);
        console.log(dict[key]['vote']);
    }
}

function songData(id, func, once=false) {
    var ref = database.ref('/jukebox/' + id).orderByChild('vote');
    // if (once) {
    //     ref.once('value', function(snapshot) {
    //         var songList = [];
    //         snapshot.forEach(function(child) {
    //            songList.push(child.val());
    //         });
    //         songList.reverse()
    //         console.log(songList);
    //         func(songList);
    //         // // colsone.log(snapshot.val());
    //     });
    // } else {
        ref.on('value', function(snapshot) {
            var songList = [];
            snapshot.forEach(function(child) {
               songList.push(child.val());
            });
            songList.reverse()
            console.log(songList);
            func(songList);
            // // colsone.log(snapshot.val());
        });
    // }
}

// songData('box1', iter);

// updateSong("box1", "Fantaisie Impromptu", "fBA-38mzabs", 2)