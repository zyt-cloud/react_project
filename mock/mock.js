import Mock from 'mockjs';

let Random = Mock.Random;


Mock.mock(/\.json/, {
    'list|1-10': [{
        'goods_id|+1': 1,
        'goods_name': '@city(true)'
    }]
})
