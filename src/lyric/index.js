const lyric = `Hello - Adele
Written by：Adele Adkins/Greg Kurstin
Hello it's me
I was wondering if after all these years you'd like to meet
To go over everything
They say that time's supposed to heal ya but I ain't done much healing
Hello can you hear me
I'm in california dreaming about who we used to be
When we were younger and free
I've forgotten how it felt before the world fell at our feet
There's such a difference between us
And a million miles
Hello from the other side
I must've called a thousand times to tell you
I'm sorry for everything that I've done
But when I call you never seem to be home
Hello from the outside
At least I can say that I've tried to tell you
I'm sorry for breaking your heart
But it don't matter it clearly doesn't tear you apart anymore
Hello how are you
It's so typical of me to talk about myself
I'm sorry I hope that you're well
Did you ever make it out of that town
Where nothing ever happened
It's no secret
That the both of us are running out of time
So hello from the other side
I must've called a thousand times to tell you
I'm sorry for everything that I've done
But when I call you never seem to be home
Hello from the outside
At least I can say that I've tried to tell you
I'm sorry for breaking your heart
But it don't matter it clearly doesn't tear you apart anymore
Ooooohh anymore
Ooooohh anymore
Ooooohh anymore
Anymore
Hello from the other side
I must've called a thousand times to tell you
I'm sorry for everything that I've done
But when I call you never seem to be home
Hello from the outside
At least I can say that I've tried to tell you
I'm sorry for breaking your heart
But it don't matter it clearly doesn't tear you apart anymore
`
const string = lyric.split('\n')
console.log(string, 'string')
var doms = {
  audio: document.querySelector('audio')
}

function findIndex() {
  var curTime = doms.audio.currentTime
  console.log(curTime, 'cc')
}
findIndex()
