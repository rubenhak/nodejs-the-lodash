import 'mocha';
import should = require('should');

import _ from '../src';

    describe('_.isDefaultedEqual', function() {
        it('sample positive empty', function () {
            var a = { }
            var b = { }
            var result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(true);
        });

        it('sample positive 1', function () {
            var a = { "aaa": 1234, "bbb": { "ccc" : true, "ddd" : "zzzz"}}
            var b = { "aaa": 1234, "bbb": { "ddd" : "zzzz", "ccc" : true}}
            var result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(true);
        });

        it('sample positive missing prop 1', function () {
            var a = { "aaa": 1234 }
            var b = { }
            var result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(true);
        });

        it('sample positive missing prop 2', function () {
            var a = { "aaa": { "bbb" : 1234 } }
            var b = { }
            var result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(true);
        });

        it('sample positive missing prop 3', function () {
            var a = { "aaa": { "bbb" : 1234 } }
            var b = { "aaa": {} }
            var result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(true);
        });

        it('sample positive missing prop 4', function () {
            var a = { "aaa": 1234, "bbb": { "ccc" : true, "ddd" : "zzzz"}}
            var b = { "bbb": { "ddd" : "zzzz"}}
            var result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(true);
        });

        it('sample positive missing prop 5', function () {
            var a = { "aaa": 1234, "bbb": { "ccc" : true, "ddd" : "zzzz", "eee": [1, 3, 4]}}
            var b = { "bbb": { "ddd" : "zzzz", "ccc" : true}}
            var result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(true);
        });

        it('sample args const check 1', function () {
            var a = { "aaa": 1234 }
            var b = { }
            var result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(true);
            should(a).be.eql({ "aaa": 1234 });
            should(b).be.eql({ });
        });

        it('sample args const check 2', function () {
            var a = { }
            var b = { "aaa": 1234 }
            var result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(false);
            should(a).be.eql({ });
            should(b).be.eql({ "aaa": 1234 });
        });

        it('sample negative 1', function () {
            var a = { "aaa": 1234, "bbb": { "ccc" : true, "ddd" : "zzzz"}}
            var b = { "aaa": 123, "bbb": { "ddd" : "zzzz", "ccc" : true}}
            var result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(false);
            should(a.aaa).be.exactly(1234);
            should(b.aaa).be.exactly(123);
        });

        it('sample negative 2', function () {
            var a = { "bbb": { "ccc" : true, "ddd" : "zzzz"}}
            var b = { "aaa": 123, "bbb": { "ddd" : "zzzz", "ccc" : true}}
            var result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(false);
        });

        it('sample negative 3', function () {
            var a = { "aaa": 123, "bbb": { "ddd" : "zzzz"}}
            var b = { "aaa": 123, "bbb": { "ddd" : "zzzz", "ccc" : true}}
            var result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(false);
        });

        it('sample nulls', function () {
            var a = null;
            var b = null;
            var result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(true);
        });

        it('sample undefineds', function () {
            var a;
            var b;
            var result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(true);
        });

        it('sample null & undefined', function () {
            var a = null;
            var b;
            var result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(true);
        });

        it('sample type diff', function () {
            var a = {
                "BERLIOZ_IDENTITY": "0"
            }
            var b = {
                "BERLIOZ_IDENTITY": 0
            }
            var result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(false);
        });

        
        /*** ARRAY TESTS ***/
        it('sample negative array order', function () {
            var a = { "aaa": 1234, "bbb": { "ccc" : true, "ddd" : "zzzz", "eee": [1, 3, 4]}}
            var b = { "aaa": 1234, "bbb": { "ddd" : "zzzz", "ccc" : true, "eee": [1, 3, 5]}}
            var result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(false);
        });

        it('sample negative arrays 1', function () {
            var a = { "aaa": 1234, "bbb": { "ccc": [1, 2, 3]}}
            var b = { "aaa": 1234, "bbb": { "ccc": [1, 3, 2]}}
            var result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(false);
        });

        it('string array same', function () {
            var a = { "aaa": ["a", "b", "c"]}
            var b = { "aaa": ["a", "b", "c"]}
            var result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(true);
        });

        it('string array different order', function () {
            var a = { "aaa": ["a", "b", "c"]}
            var b = { "aaa": ["a", "b"]}
            var result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(false);
        });

        it('string array different order', function () {
            var a = { "aaa": ["a", "b", "c"]}
            var b = { "aaa": ["a", "c", "b"]}
            var result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(false);
        });

        it('string array different order, arrayMetaCorrector', function () {
            var a = { "aaa": ["a", "b", "c"]}
            var b = { "aaa": ["a", "c", "b"]}
            var result = _.isDefaultedEqual(a, b, {
                "aaa": {
                    keySelector: x => x,
                    valueSelector: x => x
                }
            });
            should(result).be.exactly(true);

            result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(false);
        });

        it('string array different order, arrayMetaCorrector default', function () {
            var a = { "aaa": ["a", "b", "c"]}
            var b = { "aaa": ["a", "c", "b"]}

            var result = _.isDefaultedEqual(a, b, {
                "aaa": {
                }
            });
            should(result).be.exactly(true);

            result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(false);
        });

        it('string array different order, arrayMetaCorrector default deep', function () {
            var a = { "aaa": { "bbb":  ["a", "b", "c"]} }
            var b = { "aaa": { "bbb": ["a", "c", "b"]} }

            var result = _.isDefaultedEqual(a, b, {
                "aaa.bbb": {}
            });
            should(result).be.exactly(true);

            result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(false);
        });

        it('string array different order, arrayMetaCorrector default deep negative 1', function () {
            var a = { "aaa": { "bbb":  ["a", "c"]} }
            var b = { "aaa": { "bbb": ["a", "c", "b"]} }

            var result = _.isDefaultedEqual(a, b, {});
            should(result).be.exactly(false);

            result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(false);
        });

        it('string array different order, arrayMetaCorrector default deep negative 2', function () {
            var a = { "aaa": { "bbb":  ["a", "c", "b"]} }
            var b = { "aaa": { "bbb": ["a", "c"]} }

            var result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(false);

            result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(false);
        });

        it('object array different order, arrayMetaCorrector default deep', function () {
            var a = { "aaa": { "bbb":  [ {"name": "a", "desc": "kuku"}, {"name": "b"}]} }
            var b = { "aaa": { "bbb": [{"name": "b"}, {"name": "a"}]} }

            var result = _.isDefaultedEqual(a, b, {
                "aaa.bbb": {
                    keySelector: x => x.name
                }
            });
            should(result).be.exactly(true);

            result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(false);
        });

        it('object array different order, arrayMetaCorrector default deep extra inner base props', function () {
            var a = { "aaa": { "bbb":  [ {"name": "a", "desc": "kuku"}]} }
            var b = { "aaa": { "bbb": [{"name": "a"}]} }

            var result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(true);

            result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(true);
        });

        it('object array different order, arrayMetaCorrector default deep extra inner base props', function () {
            var a = { "aaa": { "bbb":  [ {"mimi": 1234, "name": "a", "desc": "kuku"}]} }
            var b = { "aaa": { "bbb": [{"name": "a"}]} }

            var result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(true);

            result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(true);
        });
        
        it('object array different order, arrayMetaCorrector default deep extra inner base ', function () {
            var a = { "aaa": { "bbb":  [ {"name": "b", "lala": "lulu"}, {"mimi": 1234, "name": "a", "desc": "kuku"}]} }
            var b = { "aaa": { "bbb": [{"name": "a"}, {"name": "b"} ]} }

            var result = _.isDefaultedEqual(a, b, {
                "aaa.bbb": {
                    keySelector: x => x.name
                }
            });
            should(result).be.exactly(true);

            result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(false);
        });

        it('object array different order, arrayMetaCorrector default deep extra inner base ', function () {
            var a = { "aaa": { "bbb":  [ {"name": "b", "lala": "lulu"}, {"mimi": 1234, "name": "a", "desc": "kuku"}]} }
            var b = { "aaa": { "bbb": [{"name": "a"}, {"name": "c"} ]} }

            var result = _.isDefaultedEqual(a, b, {
                "aaa.bbb": {
                    keySelector: x => x.name
                }
            });
            should(result).be.exactly(false);

            result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(false);
        });
        
        it('object array different order, arrayMetaCorrector default deep extra inner base props negative', function () {
            var a = { "aaa": { "bbb":  [ {"mimi": 1234, "name": "a", "desc": "kuku"}]} }
            var b = { "aaa": { "bbb": [{"name": "a", "mama": 1234} ]} }

            var result = _.isDefaultedEqual(a, b, {
                "aaa.bbb": {
                    keySelector: x => x.name
                }
            });
            should(result).be.exactly(false);

            result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(false);
        });

        it('object array different order, arrayMetaCorrector default deep extra inner base props negative', function () {
            var a = { "aaa": { "bbb":  [ {"mimi": 1234, "name": "a", "desc": "kuku"}]} }
            var b = { "aaa": { "bbb": [{"name": "b"} ]} }

            var result = _.isDefaultedEqual(a, b, {
                "aaa.bbb": {
                    keySelector: x => x.name
                }
            });
            should(result).be.exactly(false);

            result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(false);
        });

        it('object array different order, arrayMetaCorrector default deep negative', function () {
            var a = { "aaa": { "bbb":  [ {"name": "a", "desc": "kuku"}]} }
            var b = { "aaa": { "bbb": [{"name": "a", "desc": "kaka"}]} }

            var result = _.isDefaultedEqual(a, b, {
                "aaa.bbb": {}
            });
            should(result).be.exactly(false);

            result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(false);
        });


        it('nested array', function () {
            var a = {
                "aaa": {
                    "bbb": [{
                            "name": "a",
                            "data": [{
                                "id": 111
                            }, {
                                "id": 222
                            }]
                        },
                        {
                            "name": "b",
                            "data": [{
                                "id": 333
                            }, {
                                "id": 444
                            }]
                        }
                    ]
                }
            };
            var b = {
                "aaa": {
                    "bbb": [{
                            "name": "b",
                            "data": [{
                                "id": 444
                            }, {
                                "id": 333
                            }]
                        },
                        {
                            "name": "a",
                            "data": [{
                                "id": 222
                            }, {
                                "id": 111
                            }]
                        }
                    ]
                }
            }

            var result = _.isDefaultedEqual(a, b, {
                "aaa.bbb": {
                    keySelector: x => x.name
                },
                "aaa.bbb.[].data": {
                    keySelector: x => x.id
                }
            });
            should(result).be.exactly(true);

            result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(false);
        });

        it('nested array 2', function () {
            var a = {
                "aaa": {
                    "bbb": [{
                            "name": "a",
                            "data": [{
                                "id": 111
                            }, {
                                "id": 222
                            }]
                        },
                        {
                            "name": "b",
                            "data": [{
                                "id": 333
                            }, {
                                "id": 444
                            }]
                        }
                    ]
                }
            };
            var b = {
                "aaa": {
                    "bbb": [{
                            "name": "b",
                            "data": [{
                                "id": 445
                            }, {
                                "id": 333
                            }]
                        },
                        {
                            "name": "a",
                            "data": [{
                                "id": 222
                            }, {
                                "id": 111
                            }]
                        }
                    ]
                }
            }

            var result = _.isDefaultedEqual(a, b, {
                "aaa.bbb": {
                    keySelector: x => x.name
                },
                "aaa.bbb.[].data": {
                    keySelector: x => x.id
                }
            });
            should(result).be.exactly(false);

            result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(false);
        });

        it('nested array 3', function () {
            var a = {
                "aaa": {
                    "bbb": [{
                            "name": "a",
                            "data": [{
                                "id": 111
                            }, {
                                "id": 222
                            }]
                        },
                        {
                            "name": "b",
                            "data": [{
                                "id": 333
                            }, {
                                "id": 444
                            }]
                        }
                    ]
                }
            };
            var b = {
                "aaa": {
                    "bbb": [{
                            "name": "b",
                            "data": [{
                                "id": 444
                            }, {
                                "id": 333
                            }, {
                                "id": 555
                            }]
                        },
                        {
                            "name": "a",
                            "data": [{
                                "id": 222
                            }, {
                                "id": 111
                            }]
                        }
                    ]
                }
            }

            var result = _.isDefaultedEqual(a, b, {
                "aaa.bbb": {
                    keySelector: x => x.name
                },
                "aaa.bbb.[].data": {
                    keySelector: x => x.id
                }
            });
            should(result).be.exactly(false);

            result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(false);
        });

        it('nested array 4', function () {
            var a = {
                "aaa": {
                    "bbb": [{
                            "name": "a",
                            "data": [{
                                "id": 111
                            }, {
                                "id": 222
                            }]
                        },
                        {
                            "name": "b",
                            "data": [{
                                "id": 333
                            }, {
                                "id": 444
                            }]
                        }
                    ]
                }
            };
            var b = {
                "aaa": {
                    "bbb": [{
                            "name": "b",
                            "data": [{
                                "id": 444
                            }]
                        },
                        {
                            "name": "a",
                            "data": [{
                                "id": 222
                            }, {
                                "id": 111
                            }]
                        }
                    ]
                }
            }

            var result = _.isDefaultedEqual(a, b, {
                "aaa.bbb": {
                    keySelector: x => x.name
                },
                "aaa.bbb.[].data": {
                    keySelector: x => x.id
                }
            });
            should(result).be.exactly(false);

            result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(false);
        });

        it('nested array 5', function () {
            var a = {
                "aaa": {
                    "bbb": [{
                            "name": "a",
                            "data": [{
                                "id": 111,
                                "desc": "zzz"
                            }, {
                                "id": 222
                            }]
                        },
                        {
                            "name": "b",
                            "data": [{
                                "id": 333
                            }, {
                                "id": 444
                            }]
                        }
                    ]
                }
            };
            var b = {
                "aaa": {
                    "bbb": [{
                            "name": "b",
                            "data": [{
                                "id": 444
                            }, {
                                "id": 333
                            }]
                        },
                        {
                            "name": "a",
                            "data": [{
                                "id": 222
                            }, {
                                "id": 111
                            }]
                        }
                    ]
                }
            }

            var result = _.isDefaultedEqual(a, b, {
                "aaa.bbb": {
                    keySelector: x => x.name
                },
                "aaa.bbb.[].data": {
                    keySelector: x => x.id
                }
            });
            should(result).be.exactly(true);

            result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(false);
        });

        it('nested array 6', function () {
            var a = {
                "aaa": {
                    "bbb": [{
                            "name": "a",
                            "data": [{
                                "id": 111,                                
                            }, {
                                "id": 222
                            }]
                        },
                        {
                            "name": "b",
                            "data": [{
                                "id": 333,
                                "desc": "aaa"
                            }, {
                                "id": 444
                            }]
                        }
                    ]
                }
            };
            var b = {
                "aaa": {
                    "bbb": [{
                            "name": "b",
                            "data": [{
                                "id": 444
                            }, {
                                "id": 333,
                                "desc": 11
                            }]
                        },
                        {
                            "name": "a",
                            "data": [{
                                "id": 222
                            }, {
                                "id": 111
                            }]
                        }
                    ]
                }
            }

            var result = _.isDefaultedEqual(a, b, {
                "aaa.bbb": {
                    keySelector: x => x.name
                },
                "aaa.bbb.[].data": {
                    keySelector: x => x.id
                }
            });
            should(result).be.exactly(false);

            result = _.isDefaultedEqual(a, b);
            should(result).be.exactly(false);
        });

    });
