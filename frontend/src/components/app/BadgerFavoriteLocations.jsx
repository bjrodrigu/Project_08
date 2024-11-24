import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';

export default function BadgerFavoriteLocations({ location, isStarred, onRemoveFavorite }) {
    const [starred, setStarred] = useState(isStarred); // 控制星星状态

    const handleStarClick = () => {
        if (starred) {
            setStarred(false); // 熄灭星星
            onRemoveFavorite(location); // 通知父组件删除收藏
        }
    };

    return (
        <Card style={{ margin: '1rem 0', padding: '1rem', borderRadius: '1rem' }}>
            <Card.Body className="d-flex justify-content-between align-items-center">
                {/* 显示地点名称 */}
                <Card.Title>{location}</Card.Title>
                {/* React Star Ratings */}
                <StarRatings
                    rating={starred ? 1 : 0} // 如果收藏，则显示1星；否则为0星
                    numberOfStars={1} // 只显示1颗星
                    starRatedColor="gold" // 星星亮时的颜色
                    starEmptyColor="gray" // 星星灭时的颜色
                    starDimension="24px" // 星星尺寸
                    starSpacing="2px" // 星星之间的间距
                    changeRating={handleStarClick} // 点击星星时触发
                />
            </Card.Body>
        </Card>
    );
}
