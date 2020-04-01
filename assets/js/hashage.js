





function animations() {

}
animations.prototype={
    constructor:animations(),
    animeblockdown:function (nmrdublock) {
        anime({
            targets:document.getElementById('block'+(nmrdublock+1)),
            translateY:200,
            translateX:0,
            duration:1000,
            easing:'linear'
        });
    },
    animeblock:function (nmrdublock) { //pour animer lire dire///////////////////////////////////
        anime({
            targets:document.getElementById('block'+(nmrdublock)),
            translateY:[{value:30,duration:500},{value: 0}],
            translateX: 0,
            opacity:1,
            borderColor:[{value:'#07d6ff',duration:800},{
                value: '#1D74AD'
            }],
            backgroundColor:[{value:'#0ac4ff',duration:800},{value:'#fff'}]

        });
    },

    animeoverflow:function(nmrdublock){
        anime({
            targets:document.getElementById('overflow'+(nmrdublock)),
            //translateY:[{value:300,duration:500},{value: 0}],
            translateX: 0,
            opacity:1,
            borderColor:[{value:'#8affb1',duration:800},{
                value: '#000000'
            }],
            backgroundColor:[{value:'#8affb1',duration:800},{
                value: '#ffffff'
            }],
        });

    },

    animeenrg:function(bloc,enrg){ ////////////////////////////////////////////
        anime({
            targets:document.getElementById('enreg'+(enrg+2)+'block'+bloc),
            //translateY:20,
            //  translateX: 0,
            opacity:1,
            borderColor:[{value:"#ffda06",duration:500},{
                value: '#000000'
            }]
        });
    },


    animenreg:function (nmrDuBlock,nmrEnreg,color) {
        let a=document.getElementById('enreg'+(nmrEnreg+1)+'block'+(nmrDuBlock+1));
        anime({
            targets:a,
            width:[{value:21 ,duration:500},
                {value: 20}
            ],
            height:[{value:21,duration:500},
                {value: 20}],
            backgroundColor:[{value:color,
                duration:500,},
                {
                    value: '#ffffff'
                }]
        })

    },
    anime_border_enreg:function (nmrBlock,nmrEnreg,borderColor) {
        anime({
            targets:'enreg'+(nmrEnreg+1)+'block'+(nmrBlock+1),
            borderTopColor:borderColor,
        });
    },

    animealgo:function(a){
        anime({
            targets:a,
            backgroundColor:[{value:'#ff5611',duration:700},{value: '#fff'}]
        })

    },


    animeMiseAjour:function (a) {
        anime({
            targets:a,
        borderColor:[{value:"#06ff00",duration:300},{value:'#1D74AD'}]
        })

    }



};





//===========================================================================================================




function sleep(delay) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, delay);
    });
}













class bloc{
    constructor(tabenrg,nbenrg,taboverflow){ //pour le moment les enrg sont considere des entier
        this.tabenrg=tabenrg;
        this.nbMAXenrg=nbenrg;
        this.taboverflow=taboverflow;
    }
}


class fichier{

    constructor(tabBloc,next,ordreF,tailleF, nbMAXenrg,Tcharg){
        this.tabBloc=tabBloc;
        this.next=next;
        this.ordreF=ordreF;
        this.tailleF=tailleF;//intialiser a 2
        this.nbMAXenrg=nbMAXenrg;
        this.Tcharg=Tcharg; //tauxx de chargement de fichier
    }





    alloc_overflow(p){
        let divfichier = document.getElementById('block'+p);
        let divoverflow = document.createElement('div');
        divoverflow.id = 'overflow' + (p);
        divoverflow.className = 'overflow';


        for (let i = 0; i < 5; i++) {
            let divenreg = document.createElement('div');
            divenreg.id = 'case' + i + 'overflow' + (p);//enrg radha case fe enreg
            divenreg.className = 'TenregO';
            divoverflow.appendChild(divenreg);
        }
        divfichier.appendChild(divoverflow)
    }


    alloc_bloc(p) {
        let divfichier = document.getElementById('hashage');
        let divblock = document.createElement('div');
        divblock.id = 'block' + (p);
        divblock.className = 'Tblock';
        divfichier.appendChild(divblock);

        for (let i = 0; i < this.nbMAXenrg; i++) {
            let divenreg = document.createElement('div');
            divenreg.id = 'enreg' + i + 'block' + (p);//enrg radha case fe enreg
            divenreg.className = 'Tenreg';
            divblock.appendChild(divenreg);
        }
        this.alloc_overflow(p);


    }









    hash(cle,ordre){
        var x;
        var y;
        x=Math.pow(2,ordre);
        y=cle % x;
        return y;
    }


    tauxchargmnt(){
        var x=0;
        var y=0;
        for(var i=0;i<this.tailleF;i++){
            x=x+this.tabBloc[i].tabenrg.length;
            y=y+this.tabBloc[i].nbMAXenrg;
        }
        return((x/y)*100);
    }

    adress(cle){
        var p=document.getElementById('calculadr');
        var a =this.hash(cle,this.ordreF);
        p.innerHTML='<p id="adr"> H(x) = '+cle+'  mod  2<sup>'+this.ordreF+'</sup>'+' = '+a+'</p>';
        if (a<this.next){
            a=this.hash(cle,this.ordreF+1);
            p.innerHTML+='<p id="adr"> H(x) = '+cle+'  mod  2<sup>'+(this.ordreF+1)+'</sup>'+' = '+a+'</p>';
        }
        return a;

    }


    miseajourInfo(){
        var f=document.getElementById('information');
        f.innerHTML='<p> pointeur d eclatement : '+this.next+'  <br>  '+'ordre de fichier :  '+this.ordreF+'  <br>  '+'taille de fichier :  '+this.tailleF+'  <br>  '+'taux de chargement : '+this.Tcharg+'</p>';
        var a =new animations();
        a.animeMiseAjour(f);
    }



   async insertion(cle){
        var a=new animations();
       var p=document.getElementById('calculadr');
       var o=document.getElementById('1');
       a.animealgo(o);
       await sleep(1000);
       var x=this.adress(cle);

       await sleep(500);
       o=document.getElementById('2');
       a.animealgo(o);
       if (this.tabBloc[x].tabenrg.length<this.nbMAXenrg){
            this.tabBloc[x].tabenrg.push(cle);
            var loc=this.tabBloc[x].tabenrg.indexOf(cle);
            o=document.getElementById('4');
            a.animealgo(o);
            await sleep(1000);
            var f= document.getElementById('enreg'+loc+'block'+x);
            a.animeblock(x);
            f.innerHTML='<p class="bata">'+cle+'</p>';
            await sleep(500);
        }
        else{
            this.tabBloc[x].taboverflow.push(cle);
            var loc=this.tabBloc[x].taboverflow.indexOf(cle);
            o=document.getElementById('4');
            a.animealgo(o);
            await sleep(1000);
            var f=document.getElementById('case'+loc+'overflow'+x);
            a.animeblock(x);
            await sleep(500);
            a.animeoverflow(x);
            f.innerHTML='<p class="bata" >'+cle+'</p>';
            f.style.opacity=1;

        }


        this.Tcharg=this.tauxchargmnt();
        if(this.Tcharg>70){
            p.innerHTML='<p id="adr">ECLATEMENT</p>';
            (this.tailleF)++;
            this.Tcharg=this.tauxchargmnt();
            this.alloc_bloc(this.tailleF-1);
            for(var i=0;i<this.tabBloc[this.next].tabenrg.length;i++){
               var f=document.getElementById('enreg'+i+'block'+this.next);
               f='<p class="bata"></p>';

            }
            await sleep(500);

            for(var i=0;i<this.tabBloc[this.next].nbMAXenrg;i++){

                var m=this.tabBloc[this.next].tabenrg.splice(0,1)[0];

                var z=this.hash(m,(this.ordreF+1));
                if (this.tabBloc[z].tabenrg.length<this.nbMAXenrg){
                    this.tabBloc[z].tabenrg.push(m);
                  var loc=this.tabBloc[z].tabenrg.indexOf(m);
                    f=document.getElementById('enreg'+loc+'block'+z);
                   a.animeblock(z);
                    f.innerHTML='<p class="bata">'+m+'</p>';
                    await sleep(500);

                }

                else{
                   this.tabBloc[z].taboverflow.push(m);
                    var loc=this.tabBloc[z].taboverflow.indexOf(m);
                    f=document.getElementById('case'+loc+'overflow'+z);
                    a.animeoverflow(z);
                    f.innerHTML='<p class="bata">'+m+'</p>';
                    f.style.opacity=1;
                    await sleep(500);
               }

            }
            for(var i=0;i<this.nbMAXenrg;i++){
                var f =document.getElementById('enreg'+i+'block'+this.next);
                if(this.tabBloc[this.next].tabenrg[i]!=undefined) {
                    f.innerHTML = '<p class="bata">' + this.tabBloc[this.next].tabenrg[i] + '</p>';
                }
                else{
                    f.innerHTML='<p class="bata"></p>';
                }
            }

            await sleep(800);




            if(this.tabBloc[this.next].taboverflow.length>0){
                for(var i=0;i<this.tabBloc[this.next].taboverflow.length;i++){
                    var f=document.getElementById('case'+i+'overflow'+this.next);

                    f.innerHTML='<p class="bata"></p>';
                    f.style.opacity=0;
                }
                await sleep(500);
                var len=this.tabBloc[this.next].taboverflow.length;
                for(var i=0;i<len;i++){
                    var m=this.tabBloc[this.next].taboverflow.splice(0,1)[0];
                    var y=this.hash(m,(this.ordreF+1));
                    if (this.tabBloc[y].tabenrg.length<this.nbMAXenrg){
                        this.tabBloc[y].tabenrg.push(m);
                        var loc=this.tabBloc[y].tabenrg.indexOf(m);
                        f=document.getElementById('enreg'+loc+'block'+y);
                      a.animeblock(y);
                        f.innerHTML='<p class="bata">'+m+'</p>';
                      await sleep(500);
                    }
                    else{
                        this.tabBloc[y].taboverflow.push(m);
                        var loc=this.tabBloc[y].taboverflow.indexOf(m);
                        f=document.getElementById('case'+loc+'overflow'+z);
                        a.animeoverflow(z)
                        f.innerHTML='<p class="bata">'+m+'</p>';
                        f.style.opacity=1;
                        await sleep(500);
                    }

                }
                for(var i=0;i<5;i++){
                    var f =document.getElementById('case'+i+'overflow'+this.next);
                    if(this.tabBloc[this.next].taboverflow[i]!=undefined) {
                        f.innerHTML = '<p class="bata">' + this.tabBloc[this.next].taboverflow[i] + '</p>';
                        f.style.opacity=1;
                    }
                    else{
                        f.innerHTML='<p class="bata"></p>';
                        f.style.opacity=0;
                    }
                }



            }


            this.next++;



        }
        if(this.next==Math.pow(2,this.ordreF)){
            this.next=0;
            this.ordreF++;
        }

        this.miseajourInfo();

        await sleep(700);
        p.innerHTML=p.innerHTML='<p id="adr"> H(x) = '+'</p>';



    }





    recherche(cle){
        var a=this.adress(cle);
        var trouv=false;
        var i=0;
        while(i<this.tabBloc[a].tabenrg.length && trouv==false){
            if (this.tabBloc[a].tabenrg[i]==cle){
                trouv=true;
            }
            else {
                trouv=false;
            }
            i++;
        }
        if (trouv==false){
            var j =0;
            while (j<this.tabBloc[a].taboverflow.length && trouv==false){
                if (this.tabBloc[a].taboverflow[j]==cle){
                    trouv=true;
                }
                else {
                    trouv=false;
                }
                j++;
            }
        }
        var b=[trouv,a];
        return b;

    }





}




var tabenr1=[];
var tabenr2=[];
var tabenr3=[];
 var tabenr4=[];
var tabenr5=[];
var tabenr6=[];
var tabenr7=[];
var taboverflow1=[];
var taboverflow2=[];
var taboverflow3=[];
var taboverflow4=[];
var taboverflow5=[];
var taboverflow6=[];
var taboverflow7=[];


 bloc1=new bloc(tabenr1,3,taboverflow1);
bloc2=new bloc(tabenr2,3,taboverflow2);

bloc3=new bloc(tabenr3,3,taboverflow3);
bloc4=new bloc(tabenr4,3,taboverflow4);

bloc5=new bloc(tabenr5,3,taboverflow5);
bloc6=new bloc(tabenr6,3,taboverflow6);
bloc7=new bloc(tabenr7,3,taboverflow7);

tabbloc=[];
tabbloc.push(bloc1);
tabbloc.push(bloc2);
tabbloc.push(bloc3);
tabbloc.push(bloc4);
tabbloc.push(bloc5);
tabbloc.push(bloc6);
tabbloc.push(bloc7);


fich =new fichier(tabbloc,0,1,2,3,0);

for(var j=0;j<fich.tailleF;j++){
    fich.alloc_bloc(j);
}
 fich.miseajourInfo();

