const blue = document.getElementById('blue')
      const violet = document.getElementById('violet')
      const orange = document.getElementById('orange')
      const green = document.getElementById('green')
      const btnStart = document.getElementById('btnStart')
      const LATEST_LEVEL = 10

      class Game 
      {

        constructor()
        {
          this.init = this.init.bind(this)
          this.init()
          this.generateSequence()
          setTimeout(this.nextLevel,500)
        }

        init()
        {
          this.nextLevel = this.nextLevel.bind(this)
          this.choiceColor = this.choiceColor.bind(this)
          btnStart.classList.add('hide')
          //this.toggleBtnStart()
          this.level = 1
          this.colors =
          {
            blue,
            violet,
            orange,
            green
          }
        }
        

        generateSequence()
        {
          this.sequence = new Array(LATEST_LEVEL).fill(0).map(n => Math.floor(Math.random() * 4))
        }

        nextLevel()
        {
          this.subnivel = 0
          this.lightOnSequence()
          this.addCickEvent()
        }

        transformNumberToColor(number)
        {
          let color = ''
          switch (number) {
            case 0:
                color = 'blue'
              break;
            case 1:
                color = 'violet'
              break;
            case 2:
                color = 'orange'
              break;
            case 3:
                color = 'green'
              break;
          }
          return color
        }

        transformColorToNumber(color)
        {
          let number = ''
          switch (color) {
            case 'blue':
                number =0 
              break;
            case 'violet':
                number = 1
              break;
            case 'orange':
                number = 2
              break;
            case 'green':
                number = 3
              break;
          }
          return number
        }

        lightOnSequence()
        {
          for (let index = 0; index < this.level; index++) 
          {
            const color = this.transformNumberToColor(this.sequence[index]) 
            setTimeout(()=> this.lightOnColor(color)  ,350 * index)
                      
          }
        }

        lightOnColor(color)
        {
          this.colors[color].classList.add('light')
          setTimeout(()=> this.lightOfColor(color),350)
        }

        lightOfColor(color)
        {
          this.colors[color].classList.remove('light')
        }

        addCickEvent()
        {
          this.colors.blue.addEventListener('click', this.choiceColor)
          this.colors.violet.addEventListener('click', this.choiceColor)
          this.colors.orange.addEventListener('click', this.choiceColor)
          this.colors.green.addEventListener('click', this.choiceColor)
        }

        deleteCickEvent()
        {
          this.colors.blue.removeEventListener('click', this.choiceColor)
          this.colors.violet.removeEventListener('click', this.choiceColor)
          this.colors.orange.removeEventListener('click', this.choiceColor)
          this.colors.green.removeEventListener('click', this.choiceColor)
        }

        choiceColor(event)
        {
          const colorName = event.target.dataset.color
          const colorNumber = this.transformColorToNumber(colorName)
          this.lightOnColor(colorName)
          if(colorNumber === this.sequence[this.subnivel]){
            this.subnivel ++
            if(this.subnivel === this.level){
              this.level ++
              this.deleteCickEvent()
              if(this.level === (LATEST_LEVEL  + 1)){
                this.winnerGame()
              }else{
                setTimeout(this.nextLevel,1500)
              }
            }
          }else{
              this.loserGame()
          }
        }

        winnerGame(){
          swal('Javier','Yout are the best !!').then( () =>{
            this.init()
          })

        }

        loserGame(){
          swal('Javier','You can do it !! '+this.level+' Try again :)').then( () =>{
            this.deleteCickEvent()
            this.init()
          })
        }

      }

      function startGame(){
        window.game = new Game();
      }