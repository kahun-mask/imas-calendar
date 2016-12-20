const PerformanceMap = {
  namco: '765',
  cinderella: 'シンデレラ',
  million: 'ミリオン',
  sidem: 'SideM',
  gamiP: '坂上陽三総合P',
  toba_yuma: '鳥羽アニメP&高橋宣伝P',
  yumaP: '高橋宣伝P',
  none: '未設定'
};

const Performances = [
  [ PerformanceMap.namco, PerformanceMap.cinderella, PerformanceMap.million, PerformanceMap.sidem ],
  [ PerformanceMap.namco ],
  [ PerformanceMap.namco, PerformanceMap.cinderella ],
  [ PerformanceMap.namco, PerformanceMap.million ],
  [ PerformanceMap.cinderella ],
  [ PerformanceMap.cinderella, PerformanceMap.million ],
  [ PerformanceMap.million ],
  [ PerformanceMap.gamiP ],
  [ PerformanceMap.toba_yuma ],
  [ PerformanceMap.yumaP ],
  [ PerformanceMap.sidem ],
  [ PerformanceMap.namco, PerformanceMap.cinderella, PerformanceMap.million ]
];

module.exports = {
  Performances,
  PerformanceMap
};
