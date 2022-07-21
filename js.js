window.addEventListener('DOMContentLoaded',()=>
{
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.displayPlayer');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');
    let board=['','','','','','','','',''];
    let currentPlayer ='X';
    let isGameActive = true;
    const PlayerXWIN='PlayerX won';
    const PlayerOWIN='PlayerO won';
    const TIE='Tied';
    
    
    const winningConditions=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    function handleResultValidation()
    {
        let roundWon=false;
        for(let i=0;i<=7;i++)
        {
            const winCondition=winningConditions[i];
            const a=board[winCondition[0]];
            const b=board[winCondition[1]];
            const c=board[winCondition[2]];
            if(a==='' || b===''||c==='')
            {
                continue;
            }
            if(a===b && b===c)
            {
                roundWon=true;
                break;
            }
        }
        if(roundWon)
        {
            announce(currentPlayer === 'X' ? PlayerXWIN:PlayerOWIN);
            isGameActive=false;
            return;
        }
        if(!board.includes(''))
        {
            announce(TIE);
        }
    }
    const announce=(type)=>{
        switch(type)
        {
            case PlayerOWIN:
                announcer.innerHTML='player <span class="playerO">O</span> Won';
                break;
                case PlayerXWIN:
                announcer.innerHTML='player <span class="playerX">X</span> Won';
                break;
                case TIE:
                    announcer.innerText='Tie';
                }
        announcer.classList.remove('hide');
    }
    const isValid = (title)=>
    {
        if(title.innerText==='X'||title.innerText==='O')
        {
            return false;
        }
        return true;
    }
    const updateBoard = (index)=>{
        board[index]=currentPlayer;
    }
    const changePlayer=()=>{
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer=currentPlayer === 'X' ? 'O':'X';
        playerDisplay.innerText=currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }
    const userAction = (tile,index)=>{
        if(isValid(tile)&& isGameActive)
        {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }
    const resetBoard=()=>{
        board=['','','','','','','','',''];
        isGameActive = true;
        announcer.classList.add('hide');
        if(currentPlayer==='O')
        {
            changePlayer();
        }
        tiles.forEach(title =>{
            title.innerText='';
            title.classList.remove('playerX');
            title.classList.remove('playerO');
        })
    }
    tiles.forEach((tile,index) => {
        tile.addEventListener('click',()=> userAction(tile,index));
    });
    resetButton.addEventListener('click',resetBoard);
})


