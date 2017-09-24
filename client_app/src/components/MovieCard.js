import React from 'react';

import { Image, Loader, Dimmer, Label, Icon, Card } from 'semantic-ui-react';
import TimeAgo from 'react-timeago';
import ruStrings from 'react-timeago/lib/language-strings/ru';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import ImageLoader from 'react-imageloader';

const formatter = buildFormatter(ruStrings);

function preloader(kpid) {
  return () => {
    return (
      <Dimmer active>
        <Loader />
        <Image
          className="invisible"
          src={
            'https://st.kp.yandex.net/images/film_iphone/iphone360_' +
            (kpid != null && kpid !== '' ? kpid : 0) +
            '.jpg'
          }
        />
      </Dimmer>
    );
  };
}

const MovieCard = (
  { sid, type, descr, ru, en, kpid, moon_tran, time, camrip, name },
  i,
  push,
) => {
  const link = `/${encodeURIComponent(
    'смотреть-онлайн',
  )}/${type.text}/${encodeURIComponent(
    ru
      .trim()
      .toLowerCase()
      .replace(new RegExp(' ', 'g'), '_'),
  )}/${sid}`;
  return (
    <Card
      href={link}
      className="main-list-item"
      centered
      key={i}
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        push(link);
      }}>
      <ImageLoader
        className="ui image"
        src={
          'https://st.kp.yandex.net/images/film_iphone/iphone360_' +
          (kpid != null && kpid !== '' ? kpid : 0) +
          '.jpg'
        }
        wrapper={React.DOM.div}
        preloader={preloader(kpid)}>
        Изображение не найдено!
      </ImageLoader>
      <Card.Content>
        <Card.Header>{ru && ru.replace(/\\/g, '')}</Card.Header>
        <Card.Meta>{en && en.replace(/\\/g, '')}</Card.Meta>
        <Card.Description>
          {moon_tran && (
            <div>
              <Label>{moon_tran.name}</Label>
            </div>
          )}
          {/*<div>Рейтинги</div>{descr}*/}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name="time" />
        <TimeAgo date={time} formatter={formatter} />
      </Card.Content>
    </Card>
  );
};

export default MovieCard;
/*description={`${'description'.substring(0, 100)}...`}*/
