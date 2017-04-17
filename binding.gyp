{
  'targets': [
    {
      'target_name': 'fs_open_locked',
      'include_dirs' : [
        "<!(node -e \"require('nan')\")"
      ],
      'conditions': [
        ['OS!="win"', {
          'sources': [
            'binding.cc',
          ],
        }],
      ],
      'xcode_settings': {
        'OTHER_CFLAGS': [
          '-g',
          '-O3',
        ]
      },
      'cflags': [
        '-g',
        '-O3',
      ],
    }
  ]
}
