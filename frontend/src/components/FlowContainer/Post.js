import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AutorenewIcon from '@material-ui/icons/Autorenew';

export default function Post ({ content }) {
  return (
    <Card className='post card'>
      <CardContent>
        <div className='postTitle'>
          <h1>
            {content.title}
          </h1>
        </div>
        <hr />
        <div className='postBody' dangerouslySetInnerHTML={{ __html: content.body }} />
        <ButtonGroup
          variant='text'
          className='postButtons'
        >
          <Button>
            <FavoriteIcon />
          </Button>
          <Button>
            <AutorenewIcon />
          </Button>
        </ButtonGroup>
      </CardContent>
    </Card>
  );
}
